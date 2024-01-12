import ballerina/persist as _;
import ballerina/time;

type Citizen record {|
    readonly string nic;
	PoliceCase[] policecase;
|};

type PoliceCase record {|
    readonly int caseId;
    Citizen citizen;
    string issue;
    time:Date date;
|};




