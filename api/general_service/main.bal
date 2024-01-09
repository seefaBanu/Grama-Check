import ballerina/http;

// import ballerina/io;

service /public\-user on new http:Listener(9091) {
    resource function get .() returns string|error? {
        return "Hello Public User";
    }
}
