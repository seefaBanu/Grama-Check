import ballerina/http;
import ballerina/sql;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

type NewRequest record {|
    string nic;
    string address;
|};

type CertificateRequest record {|
    readonly int id;
    string nic;
    string address;
    time:Date timeStamp;
|};

type DatabaseConfig record {|
    string host;
    string user;
    string password;
    string database;
    int port;
|};

configurable DatabaseConfig databaseConfig = ?;

// table<CertificateRequest> key(id) certificateRequests = table [];

mysql:Client gramaCheckDb = check new (...databaseConfig);

service /general
on new http:Listener(9091) {
    resource function post user/certificate(NewRequest request) returns http:Created|error {
        //check availability of nic from identity check
        //match the address from address check api
        _ = check gramaCheckDb->execute(`
        insert into certificateRequests (nic, address, timeStamp) 
        values (${request.nic},${request.address}, CURRENT_TIMESTAMP);`);
        return http:CREATED;
    }

    resource function get grama/certificate() returns CertificateRequest[]|error {
        stream<CertificateRequest, sql:Error?> certificateRequestStream = gramaCheckDb->query(`select * from certificateRequests;`);
        return from var certificateRequest in certificateRequestStream
            select certificateRequest;

    }
    resource function get grama/certificate/[int id]() returns CertificateRequest|http:NotFound|error {
        CertificateRequest|sql:Error certificateRequest = gramaCheckDb->queryRow(`select * from certificateRequests where id = ${id};`);
        if certificateRequest is sql:NoRowsError {
            return http:NOT_FOUND;
        }
        return certificateRequest;
    }

}
