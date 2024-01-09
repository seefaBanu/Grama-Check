import ballerina/http;
import ballerina/io;

service /public\-user on new http:Listener(9091) {
    resource function get certificate(string hello) returns string|error? {
        io:println(hello);
        return "Hello Public User";
    }

}
