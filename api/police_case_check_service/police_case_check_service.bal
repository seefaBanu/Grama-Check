import ballerina/http;
import police_case_check_service.db;
import ballerina/persist;
import ballerina/time;

public type PoliceCase record {|
    string citizenNic;
    string issue;
    time:Date date;
|};


service /police\-check on new http:Listener(9090) {
    private final db:Client dbClient;

    function init() returns error?{
        self.dbClient= check new();
    }

    resource function post .(db:Citizen citizen) returns PoliceCase[]|error {
        stream<PoliceCase,persist:Error?> cases = self.dbClient->/policecases();
        return from PoliceCase case in cases
            where case.citizenNic == citizen.nic
            select case;
    }
    

}
