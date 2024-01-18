// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/time;

public type Person record {|
    string name;
    readonly string nic;
    time:Date birthDate;
    string job;
    string gender;
|};

public type PersonOptionalized record {|
    string name?;
    string nic?;
    time:Date birthDate?;
    string job?;
    string gender?;
|};

public type PersonTargetType typedesc<PersonOptionalized>;

public type PersonInsert Person;

public type PersonUpdate record {|
    string name?;
    time:Date birthDate?;
    string job?;
    string gender?;
|};

