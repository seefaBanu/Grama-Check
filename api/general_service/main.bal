import ballerina/http;
import ballerina/time;

type NewRequest record {
    string nic;
    string address;
};

type CertificateRequest record {
    readonly int id;
    string nic;
    string address;
    time:Utc timeStamp;
};

table<CertificateRequest> key(id) certificateRequests = table [];

service /general on new http:Listener(9091) {
    resource function post user/certificate(NewRequest request) returns http:Created|error {
        //check availability of nic from identity check
        //match the address from address check api
        certificateRequests.add({id: certificateRequests.length() + 1, timeStamp: time:utcNow(), nic: request.nic, address: request.address});
        return http:CREATED;
    }

    resource function get grama/certificate() returns CertificateRequest[]|error {
        return certificateRequests.toArray();
    }
    resource function get grama/certificate/[int id]() returns CertificateRequest|http:NotFound|error {
        CertificateRequest? request = certificateRequests[id];
        if request is () {
            return http:NOT_FOUND;
        }
        return request;
    }

}
