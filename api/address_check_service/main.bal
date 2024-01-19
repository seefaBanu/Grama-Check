import address_check_service.db;

import ballerina/http;
import ballerina/lang.'string;
import ballerina/persist;

type UserDto record {|
    readonly string nic;
    string address;
|};

service /address\-check on new http:Listener(9090) {
    private final db:Client dbClient;

    public function init() returns error? {
        self.dbClient = check new ();
    }

    resource function post .(UserDto userDto) returns http:InternalServerError|http:BadRequest|http:NotFound|http:Ok {

        UserDto|persist:Error user = self.dbClient->/users/[userDto.nic]();
        if (user is persist:Error) {
            if user is persist:NotFoundError {
                return http:NOT_FOUND;
            }
            return http:INTERNAL_SERVER_ERROR;
        }

        if (string:equalsIgnoreCaseAscii(string:trim(user.address), string:trim(userDto.address))) {
            return http:OK;
        } else {
            return http:BAD_REQUEST;
        }

        //have to remove white spaces

    }

}

