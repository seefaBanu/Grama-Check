import general_service.db;

import ballerina/http;
import ballerina/io;
import ballerina/persist;
import ballerina/time;
import ballerina/uuid;

type NewCertificateRequest record {|
    string nic;
    string address;
    // string grama_area?;
|};

type CertificateRequestDTO record {|
    string id;
    string nic;
    string address;
    record {|
        time:Civil submitted;
        time:Civil? address_verified;
        time:Civil? approved;
    |} status;
    string userEmail;
    string assignedGramiEmail;
|};

configurable string identityEndpoint = ?;
// configurable string addressEndpoint = ?;
configurable string consumerKey = ?;
configurable string consumerSecret = ?;
configurable string tokenEndpoint = ?;

type Person record {|
    string name;
    string nic;
    time:Date birthDate;
    string job;
    string gender;

|};

type NotFoundErrorMessage record {|
    *http:NotFound;

|};

type InternalServerErrorMessage record {|
    *http:InternalServerError;
|};

service /general on new http:Listener(9091) {
    private final db:Client dbClient;
    function init() returns error? {
        self.dbClient = check new ();
    }

    resource function post user/certificate(NewCertificateRequest certificateRequest) returns http:InternalServerError|http:Created|http:NotFound|error {
        http:Client identityClient = check new (identityEndpoint,
            auth = {
                tokenUrl: tokenEndpoint,
                clientId: consumerKey,
                clientSecret: consumerSecret,
                clientConfig: {
                    secureSocket: {
                        disable: true
                    }
                }
            }
        );
        Person|http:Error person = identityClient->/verify\-nic.post({
            nic: certificateRequest.nic
        });
        if (person is http:Error) {
            if (person.message() == "Not Found") {
                NotFoundErrorMessage identityFailed = {
                    body: {message: string `Identity Check Failed.`}
                };
                return identityFailed;
            }
            InternalServerErrorMessage identityFailed = {
                body: {message: string `Error connecting to Identity Service.`}
            };
            return identityFailed;
        }
        io:print("person: ", person);
        //check availability of nic from identity check
        //match the address from address check api
        db:StatusInsert status = {id: uuid:createType4AsString(), submitted: time:utcToCivil(time:utcNow()), address_verified: null, approved: null};
        db:CertificateRequestInsert newCertificateRequest = {id: uuid:createType4AsString(), nic: certificateRequest.nic, address: certificateRequest.address, statusId: status.id, userEmail: "haritha@hasathcharu.com", assignedGramiEmail: "seefa@wso2.com"};
        string[]|persist:Error statusResult = self.dbClient->/statuses.post([status]);
        if statusResult is persist:Error {
            return http:INTERNAL_SERVER_ERROR;
        }
        string[]|persist:Error result = self.dbClient->/certificaterequests.post([newCertificateRequest]);
        if result is persist:Error {
            return http:INTERNAL_SERVER_ERROR;
        }
        return http:CREATED;
    }

    resource function get grama/certificate() returns CertificateRequestDTO[]|error {
        stream<CertificateRequestDTO, persist:Error?> certificateRequests = self.dbClient->/certificaterequests;
        return from CertificateRequestDTO certificateRequest in certificateRequests
            select certificateRequest;
    }

    resource function get grama/certificate/[string id]() returns CertificateRequestDTO|http:NotFound|error {
        CertificateRequestDTO|persist:Error certificateRequest = self.dbClient->/certificaterequests/[id]();
        //add police check integration
        if certificateRequest is persist:NotFoundError {
            return http:NOT_FOUND;
        }
        return certificateRequest;
    }

}
