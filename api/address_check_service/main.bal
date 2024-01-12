import ballerina/http;
import address_check_service.db;
import ballerina/persist;

type User record {|
   	readonly string nic;
   	string address;
|};



service / on new http:Listener(9090) {
	private final db:Client dbClient;
	
	public function init() returns error?{
		self.dbClient = check new();
	}

        resource function post address\-check(User user) returns boolean | error {
       string|sql:Error? address = self.dbClient->queryRow(`SELECT address FROM User WHERE nic=${user.nic}`);
	   if (string:toLowerAscii(user.address) ==  string:toLowerAscii(check address ?: "")){return true;}
	   else{
		return false;
	   }


    }


}
