import ballerina/http;
// import ballerina/time;
// import ballerinax/mysql;
import ballerina/sql;
import identity_service.db;
import ballerina/persist;
// import ballerina/io;



// configurable string USER = ?;
// configurable string PASSWORD = ?;
// configurable string HOST = ?;
// configurable int PORT = ?;
// configurable string DATABASE = ?;

// mysql:Client personDataDb =check new(host=HOST, user=USER, password=PASSWORD, port=PORT, database="identity");

type PersonNotFound record {|
    *http:NotFound;
    
|};

// type Person record {|
// readonly int id;
// string name;
// string nic;
// time:Date birthDate;
// string job;
// string gender;
    
// |};

type NICJSON record{|
    string nic;
|};


service /identity on new http:Listener(9090) {
    private final db:Client dbClient;
    // db:Client Person;

    function init() returns error? {
        self.dbClient = check new();
    }
    // db:Person Person;
    resource function post check\-nic(NICJSON nicJson) returns db:Person |PersonNotFound|error {
        db:Person|persist:Error person=self.dbClient->/people/[nicJson.nic]();
        if person is sql:NoRowsError{
            PersonNotFound personNotFound={
                body: {message: string `This ${nicJson.nic} is invalid` }
            };
            return  personNotFound;
           
        }
        return person;
    }

    // }

}
  
    //  resource function get check\-nic/[string nic]() returns Person|PersonNotFound|error {
    //     Person|sql:Error person=personDataDb->queryRow(`SELECT *FROM person where person.nic=${nic}`);
    //     if person is sql:NoRowsError{
    //         PersonNotFound personNotFound={
    //             body: {message: string `This ${nic} is invalid` }
    //         };
    //         return  personNotFound;
           
    //     }
    //     return person;
    // }

    
// }
