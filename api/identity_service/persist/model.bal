import ballerina/persist as _;
import ballerina/time;

type Person record {|
string name;
readonly string nic;
time:Date birthDate;
string job;
string gender;
    
|};