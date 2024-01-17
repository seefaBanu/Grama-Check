import address_check_service.db;

import ballerina/http;
import ballerina/persist;
import ballerina/lang.'string;

type UserDto record {|
    readonly string nic;
    string address;
|};

service /address\-check on new http:Listener(9090) {
    private final db:Client dbClient;

    public function init() returns error? {
        self.dbClient = check new ();
    }
    

    resource function post .(UserDto userDto) returns boolean|http:InternalServerError|http:NotFound|error {

        UserDto|persist:Error user = check self.dbClient->/users/[userDto.nic]();
        if (user is persist:Error) {
            if user is persist:NotFoundError {
                return http:NOT_FOUND;
            }
            return http:INTERNAL_SERVER_ERROR;
        }

    if (string:equalsIgnoreCaseAscii(string:trim(user.address), string:trim(userDto.address))) {
            return true;
        } else {
            return false;
        }

        //have to remove white spaces

        

    }

}

