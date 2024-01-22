import general_service.db;

import ballerina/http;
import ballerina/io;
import ballerina/jwt;
import ballerina/log;
import ballerina/persist;
import ballerina/time;
import ballerina/uuid;

type NewCertificateRequest record {|
    string nic;
    string address;
    string gramaEmail;
    // string userName;
    // string grama_area?;
|};

type CertificateRequestDTO record {|
    string id;
    string nic;
    string address;
    string? checkedAddress;
    string userEmail;
    string userName;
    string assignedGramiEmail;
    record {|
        time:Civil submitted;
        time:Civil? address_verified;
        time:Civil? approved;
        time:Civil? completed;
        time:Civil? rejected;
    |} status;
|};

type CertificatePolicedCheckedRequestDTO record {|
    *CertificateRequestDTO;
    PoliceCase[] policeCases;
|};

configurable string identityEndpoint = ?;
configurable string addressEndpoint = ?;
configurable string policeEndpoint = ?;
configurable string messageEndpoint = ?;
configurable string consumerKey = ?;
configurable string identityConsumerSecret = ?;
configurable string addressConsumerSecret = ?;
configurable string policeConsumerSecret = ?;
configurable string messageConsumerSecret = ?;
configurable string tokenEndpoint = ?;

type Person record {|
    string name;
    string nic;
    time:Date birthDate;
    string job;
    string gender;

|};

type PoliceCase record {|
    int caseId;
    string citizenNic;
    string issue;
    time:Date date;
|};

type NotFoundErrorMessage record {|
    *http:NotFound;

|};

type NoUserContextErrorMessage record {|
    *http:Unauthorized;
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

InternalServerErrorMessage policeFailed = {
    body: {message: string `Error connecting to Police Service.`}
};

InternalServerErrorMessage failed = {
    body: {message: string `Internal Server Error`}
};

type ReadyDto record {
    string id;
    boolean isReady;
};

type AddressCheckDto record {
    string nic;
    string address;
    boolean matched;
};

http:Client messageClient = check new (messageEndpoint,
            auth = {
                tokenUrl: tokenEndpoint,
                clientId: consumerKey,
                clientSecret: messageConsumerSecret,
                clientConfig: {
                    secureSocket: {
                        disable: true
                    }
                }
            });

public function sendMessage(string receiver,string message) returns http:Response|http:ClientError {
     http:Response|http:ClientError response = messageClient->/.post({
            receiver:receiver,
            message:message
        });

    return response;
    
}

type UserJwtPayload record {
    *jwt:Payload;
    string? email;
};

service /general on new http:Listener(9091) {
    private final db:Client dbClient;
    function init() returns error? {
        self.dbClient = check new ();
    }

    resource function post user/certificate(@http:Header string x\-jwt\-assertion, NewCertificateRequest certificateRequest) returns http:Unauthorized|http:InternalServerError|http:Created|http:NotFound|http:BadRequest|error {
        [jwt:Header, jwt:Payload]|jwt:Error jwtResult = check jwt:decode(x\-jwt\-assertion);
        if (jwtResult is jwt:Error) {
            NoUserContextErrorMessage noUserContextErrorMessage = {
                body: {message: string `No JWT found.`}
            };
            return noUserContextErrorMessage;
        }
        string email = <string>jwtResult[1]["email"];
        if ((email == "")) {
            NoUserContextErrorMessage noUserContextErrorMessage = {
                body: {message: string `No user context found.`}
            };
            return noUserContextErrorMessage;
        }
        stream<CertificateRequestDTO, persist:Error?> certificateRequestsStream = self.dbClient->/certificaterequests;
        CertificateRequestDTO[]|persist:Error certificates = from CertificateRequestDTO certificate in certificateRequestsStream
            where certificate.userEmail == email && certificate.status.completed == null && certificate.status.rejected == null
            select certificate;
        if certificates is persist:Error {
            return http:INTERNAL_SERVER_ERROR;
        }
        if (certificates.length() != 0) {
            return http:BAD_REQUEST;
        }
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
        db:CertificateRequestInsert newCertificateRequest = {id: uuid:createType4AsString(), nic: certificateRequest.nic, address: certificateRequest.address, statusId: status.id, userEmail: email, assignedGramiEmail: certificateRequest.gramaEmail, userName: person.name, checkedAddress: null};
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

    resource function get grama/certificate/[string id]() returns CertificatePolicedCheckedRequestDTO|http:NotFound|http:InternalServerError|error {
        CertificateRequestDTO|persist:Error certificateRequest = self.dbClient->/certificaterequests/[id]();
        if certificateRequest is persist:Error {
            if certificateRequest is persist:NotFoundError {
                return http:NOT_FOUND;
            }
            return http:INTERNAL_SERVER_ERROR;
        }

        // police check integration

        http:Client policeClient = check new (policeEndpoint,
            auth = {
                tokenUrl: tokenEndpoint,
                clientId: consumerKey,
                clientSecret: policeConsumerSecret,
                clientConfig: {
                    secureSocket: {
                        disable: true
                    }
                }
            }
        );
        PoliceCase[]|http:Error cases = policeClient->/.post({
            nic: certificateRequest.nic
        });
        if (cases is http:Error) {

            return policeFailed;
        }
        CertificatePolicedCheckedRequestDTO certificatePolicedCheckedRequestDTO = {
            ...certificateRequest,
            policeCases: cases
        };
        return certificatePolicedCheckedRequestDTO;
    }

    resource function get user/certificate(@http:Header string x\-jwt\-assertion) returns http:Unauthorized|http:InternalServerError|CertificateRequestDTO|http:NotFound|error {

        [jwt:Header, jwt:Payload]|jwt:Error result = check jwt:decode(x\-jwt\-assertion);
        if (result is jwt:Error) {
            return http:UNAUTHORIZED;
        }
        string email = <string>result[1]["email"];
        if ((email == "")) {
            NoUserContextErrorMessage noUserContextErrorMessage = {
                body: {message: string `No user context found.`}
            };
            return noUserContextErrorMessage;
        }
        stream<CertificateRequestDTO, persist:Error?> certificateRequestsStream = self.dbClient->/certificaterequests;
        CertificateRequestDTO[]|persist:Error certificates = from CertificateRequestDTO certificate in certificateRequestsStream
            where certificate.userEmail == email && certificate.status.completed == null && certificate.status.rejected == null
            select certificate;
        if certificates is persist:Error {
            return http:INTERNAL_SERVER_ERROR;
        }
        if (certificates.length() == 0) {
            return http:NOT_FOUND;
        }
        return certificates[0];
        // }  else if certificateRequest.status.completed==null && certificateRequest.status.rejected ==null{
        //     return certificateRequest;
        // }

    }

    resource function put grama/approved/[string id]() returns http:InternalServerError|http:NotFound|http:Ok|http:BadRequest|error {
        db:CertificateRequest|persist:Error certificateRequest = self.dbClient->/certificaterequests/[id]();

        if (certificateRequest is persist:NotFoundError) {
            return http:NOT_FOUND;
        } else if (certificateRequest is persist:Error) {
            return http:INTERNAL_SERVER_ERROR;
        } else  {
            string statusId = certificateRequest.statusId;
             db:Status|persist:Error status = self.dbClient->/statuses/[statusId]();
            if(status is db:Status && status.approved==null && status.completed==null && status.rejected==null){
                    db:Status|persist:Error result = check self.dbClient->/statuses/[statusId].put({
                    approved: time:utcToCivil(time:utcNow()),
                    address_verified: status.address_verified!=null ? status.address_verified : time:utcToCivil(time:utcNow())
                    });
                if (result is persist:Error) {
                    return http:INTERNAL_SERVER_ERROR;
                } else {
                    string message="The certificate requested by " + certificateRequest.userName + " - " + certificateRequest.nic + " has been approved. You will be informed once the certificate is ready for collection";
                    http:Response|http:ClientError messageResponse=sendMessage("+94714607445",message);
                    return http:OK;
                }
                 
            }
                return http:BAD_REQUEST;
        }
    }

    resource function put grama/rejected/[string id](string rejectionReason) returns http:InternalServerError|http:NotFound|http:Ok|http:BadRequest|error {
        db:CertificateRequest|persist:Error certificateRequest = self.dbClient->/certificaterequests/[id]();

        if (certificateRequest is persist:NotFoundError) {
            return http:NOT_FOUND;
        } else if (certificateRequest is persist:Error) {
            return http:INTERNAL_SERVER_ERROR;
        } else if (certificateRequest is db:CertificateRequest) {
            string statusId = certificateRequest.statusId;
             db:Status|persist:Error status = self.dbClient->/statuses/[statusId]();
            if(status is db:Status){
                if(status.approved==null && status.completed==null && status.rejected==null){
                      db:Status|persist:Error result = check self.dbClient->/statuses/[statusId].put({
                rejected: time:utcToCivil(time:utcNow())
            });

            if (result is persist:Error) {
                return http:INTERNAL_SERVER_ERROR;
            } else {
                string message="The certificate requested by " + certificateRequest.userName + "-" + certificateRequest.nic + " has been rejected due to " + rejectionReason;
                http:Response|http:ClientError messageResponse=sendMessage("+94714607445",message);
                return http:OK;
            }
                }
            }
            return http:BAD_REQUEST;
          
        }
    }

    resource function put grama/ready/[string id]() returns http:InternalServerError|http:BadRequest|http:NotFound|http:Ok|error {
        db:CertificateRequest|persist:Error certificateRequest = self.dbClient->/certificaterequests/[id]();
        if certificateRequest is persist:NotFoundError {
            return http:NOT_FOUND;
        }
        else if (certificateRequest is persist:Error) {
            log:printError("Error retrieving certificate request for ID: " + id + ", Error: " + certificateRequest.message());
            return http:INTERNAL_SERVER_ERROR;
        }
        else if (certificateRequest is db:CertificateRequest) {
            string statusId = certificateRequest.statusId;
            db:Status|persist:Error status = self.dbClient->/statuses/[statusId]();
            if(status is db:Status){
                if(status.approved!=null && status.rejected==null && status.completed==null){
                    db:Status|persist:Error result = check self.dbClient->/statuses/[statusId].put({
                        completed: time:utcToCivil(time:utcNow())
                    });
                    string message="The certificate requested by " + certificateRequest.userName + " - " + certificateRequest.nic + " is ready for collection";
                    http:Response|http:ClientError messageResponse=sendMessage("+94714607445",message);
                    if (result is persist:Error) {
                        return http:INTERNAL_SERVER_ERROR;
                    }
                    return http:OK;

                }
                else{
                    return http:BAD_REQUEST;
                }
            }
           
        }
       
       return http:BAD_REQUEST;
    }

    resource function get gramadivisions() returns db:GramaDivisionOptionalized[]|http:InternalServerError|error {
        stream<db:GramaDivisionOptionalized, persist:Error?> gramaDivisions = self.dbClient->/gramadivisions;
        return from db:GramaDivisionOptionalized division in gramaDivisions
            select division;
    }
}
