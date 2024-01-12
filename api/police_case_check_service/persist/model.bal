import ballerina/persist as _;
import ballerina/time;

type Citizen record {|
    readonly string nic;
	PoliceCase[] policecases;
|};

type PoliceCase record {|
    readonly int caseId;
    Citizen citizen;
    string issue;
    time:Date date;
|};




