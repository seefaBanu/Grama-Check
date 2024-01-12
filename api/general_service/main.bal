import general_service.db;

import ballerina/http;
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

service /general on new http:Listener(9091) {
    private final db:Client dbClient;
    function init() returns error? {
        self.dbClient = check new ();
    }

    resource function post user/certificate(NewCertificateRequest certificateRequest) returns http:InternalServerError|http:Created|http:Conflict {
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
        if certificateRequest is persist:NotFoundError {
            return http:NOT_FOUND;
        }
        return certificateRequest;
    }

}
