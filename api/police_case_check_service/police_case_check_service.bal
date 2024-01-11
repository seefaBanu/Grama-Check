import ballerina/http;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/sql;




type PoliceCase record {|
    int case_id;
    string nic;
    string issue;
    time:Date date;
|};



mysql:Client Db = check new ("localhost","root","1234","test",3002);

service /police\-report\-api on new http:Listener(9090) {
    resource function get check\-user/[string nic]() returns PoliceCase[]  | error {
        stream<PoliceCase, sql:Error?> | sql:NoRowsError result = Db->query(`SELECT * FROM police_cases WHERE nic=${nic}`);
        if (result is sql:NoRowsError) {
            return [];
        }
        else if(result is stream<PoliceCase>){
            PoliceCase[] cases=[];
            foreach var case in result {
                cases.push(case);            
            }
            return cases;
        }
        else{
            return error("Error retreiving cases");
        }



    

}
}
