import ballerina/http;
import ballerina/persist;
import ballerina/time;
import police_check_service.db;

public type PoliceCase record {|
    string citizenNic;
    string issue;
    time:Date date;
|};

public type NICDTO record {|
    string nic;
|};

public type CitizenDto record {|
    string nic;
    PoliceCase[] policecases;
|};

service /police\-check on new http:Listener(9090) {
    private final db:Client dbClient;

    function init() returns error?{
        self.dbClient= check new();
    }

    resource function post .(NICDTO nicDto) returns http:InternalServerError|PoliceCase[]|http:NotFound {
        CitizenDto|persist:Error citizen = self.dbClient->/citizens/[nicDto.nic]();
        if(citizen is persist:Error){
            if citizen is persist:NotFoundError{
                return http:NOT_FOUND;
            }
            return http:INTERNAL_SERVER_ERROR;
        }
        return citizen.policecases;
    }
    
}
