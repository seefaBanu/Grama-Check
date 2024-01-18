// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/time;

public type Citizen record {|
    readonly string nic;
|};

public type CitizenOptionalized record {|
    string nic?;
|};

public type CitizenWithRelations record {|
    *CitizenOptionalized;
    PoliceCaseOptionalized[] policecase?;
|};

public type CitizenTargetType typedesc<CitizenWithRelations>;

public type CitizenInsert Citizen;

public type CitizenUpdate record {|
|};

public type PoliceCase record {|
    readonly int caseId;
    string citizenNic;
    string issue;
    time:Date date;
|};

public type PoliceCaseOptionalized record {|
    int caseId?;
    string citizenNic?;
    string issue?;
    time:Date date?;
|};

public type PoliceCaseWithRelations record {|
    *PoliceCaseOptionalized;
    CitizenOptionalized citizen?;
|};

public type PoliceCaseTargetType typedesc<PoliceCaseWithRelations>;

public type PoliceCaseInsert PoliceCase;

public type PoliceCaseUpdate record {|
    string citizenNic?;
    string issue?;
    time:Date date?;
|};

