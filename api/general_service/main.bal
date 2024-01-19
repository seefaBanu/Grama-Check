import general_service.db;

import ballerina/http;
import ballerina/io;
import ballerina/log;
import ballerina/persist;
import ballerina/time;
import ballerina/uuid;

type NewCertificateRequest record {|
    string nic;
    string address;
    // string userName;
    // string grama_area?;
|};

type CertificateRequestDTO record {|
    string id;
    string nic;
    string address;
    string? checkedAddress;
    record {|
        time:Civil submitted;
        time:Civil? address_verified;
        time:Civil? approved;
        time:Civil? completed;
        time:Civil? rejected;
    |} status;
    string userEmail;
    string userName;
    string assignedGramiEmail;
|};

configurable string identityEndpoint = ?;
configurable string addressEndpoint = ?;
configurable string consumerKey = ?;
configurable string identityConsumerSecret = ?;
configurable string addressConsumerSecret = ?;
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

type CreatedMessage record {|
    *http:Created;
|};

InternalServerErrorMessage identityFailed = {
    body: {message: string `Error connecting to Identity Service.`}
};

InternalServerErrorMessage failed = {
    body: {message: string `Internal Server Error`}
};

type CertificateRequest record {|
    readonly string id;
    string nic;
    string address;
    string? checkedAddress;
    string statusId;
    string userEmail;
    string userName;
    string assignedGramiEmail;
|};

type ReadyDto record {
    string id;
    boolean isReady;
};

type AddressCheckDto record {
    string nic;
    string address;
    boolean matched;
};

service /general on new http:Listener(9091) {
    private final db:Client dbClient;
    function init() returns error? {
        self.dbClient = check new ();
    }

    resource function post user/certificate(NewCertificateRequest certificateRequest) returns http:InternalServerError|http:Created|http:NotFound|error {

        //confirm identity with identity service

        http:Client identityClient = check new (identityEndpoint,
            auth = {
                tokenUrl: tokenEndpoint,
                clientId: consumerKey,
                clientSecret: identityConsumerSecret,
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
                NotFoundErrorMessage identityNotFound = {
                    body: {message: string `Identity Check Failed.`}
                };
                return identityNotFound;
            }
            return identityFailed;
        }

        //match the address from address check api

        http:Client addressClient = check new (addressEndpoint,
            auth = {
                tokenUrl: tokenEndpoint,
                clientId: consumerKey,
                clientSecret: addressConsumerSecret,
                clientConfig: {
                    secureSocket: {
                        disable: true
                    }
                }
            }
        );
        AddressCheckDto|http:Error address = addressClient->/.post({
            nic: certificateRequest.nic,
            address: certificateRequest.address
        });

        db:StatusInsert status = {id: uuid:createType4AsString(), submitted: time:utcToCivil(time:utcNow()), address_verified: null, approved: null, rejected: null, completed: null};
        db:CertificateRequestInsert newCertificateRequest = {id: uuid:createType4AsString(), nic: certificateRequest.nic, address: certificateRequest.address, statusId: status.id, userEmail: "haritha@hasathcharu.com", assignedGramiEmail: "seefa@wso2.com", userName: person.name, checkedAddress: null};
        if address is AddressCheckDto {
            newCertificateRequest.checkedAddress = address.address;
            if (address.matched) {
                status.address_verified = time:utcToCivil(time:utcNow());
            }
        }

        string[]|persist:Error statusResult = self.dbClient->/statuses.post([status]);
        if statusResult is persist:Error {
            io:print(statusResult.message());
            io:print("status not saved");
            return failed;
        }
        string[]|persist:Error result = self.dbClient->/certificaterequests.post([newCertificateRequest]);
        if result is persist:Error {
            io:print(result.message());
            io:print("request not saved");
            return failed;
        }
        CreatedMessage success = {
            body: {message: string `Success`}
        };
        return success;
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

    resource function get user/certificate/[string email]() returns http:InternalServerError|CertificateRequestDTO|http:Forbidden {

        // CertificateRequestDTO|persist:Error certificateRequest = self.dbClient->/certificaterequests();
        // string[]|persist:Error statusResult = self.dbClient->/statuses.post([status]);
        // db:StatusOfUser status = {id: uuid:createType4AsString(), completed: null, rejected: null};
        // stream<Request, persist:Error?> certificateRequest = self.dbClient->/certificaterequests;
        stream<CertificateRequestDTO, persist:Error?> certificateRequestsStream = self.dbClient->/certificaterequests;
        CertificateRequestDTO[]|persist:Error certificates = from CertificateRequestDTO certificate in certificateRequestsStream
            where certificate.userEmail == email && certificate.status.completed == null
            select certificate;
        if certificates is persist:Error {
            return http:INTERNAL_SERVER_ERROR;
        }
        return certificates[0];
        // }  else if certificateRequest.status.completed==null && certificateRequest.status.rejected ==null{
        //     return certificateRequest;
        // }

    }

    resource function put userApproved/certificate/[string id]() returns http:InternalServerError|http:NotFound|http:Ok|error {
        CertificateRequest|persist:Error certificateRequest = self.dbClient->/certificaterequests/[id]();

        if (certificateRequest is persist:NotFoundError) {
            return http:NOT_FOUND;
        } else if (certificateRequest is persist:Error) {
            return http:INTERNAL_SERVER_ERROR;
        } else if (certificateRequest is db:CertificateRequest) {
            string statusId = certificateRequest.statusId;

            db:Status|persist:Error result = check self.dbClient->/statuses/[statusId].put({

                approved: time:utcToCivil(time:utcNow())

            });

            if (result is persist:Error) {
                return http:INTERNAL_SERVER_ERROR;
            } else {

                return http:OK;
            }
        }
    }

    resource function put grama/ready(ReadyDto readyDto) returns http:InternalServerError|http:NotFound|http:Ok|persist:Error {
        db:CertificateRequest|persist:Error certificateRequest = self.dbClient->/certificaterequests/[readyDto.id]();
        if certificateRequest is persist:NotFoundError {
            return http:NOT_FOUND;
        }
        else if (certificateRequest is persist:Error) {
            log:printError("Error retrieving certificate request for ID: " + readyDto.id + ", Error: " + certificateRequest.message());
            return http:INTERNAL_SERVER_ERROR;
        }
        else if (certificateRequest is db:CertificateRequest) {
            string statusId = certificateRequest.statusId;
            db:Status|persist:Error result = check self.dbClient->/statuses/[statusId].put({
                completed: readyDto.isReady ? time:utcToCivil(time:utcNow()) : null
            });
            if (result is persist:Error) {
                return http:INTERNAL_SERVER_ERROR;
            }
        }
        return http:OK;
    }

}
