// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/time;

public type Person record {|
    int id;
    string name;
    readonly string nic;
    time:Date birthDate;
    string job;
    string gender;
|};

public type PersonOptionalized record {|
    int id?;
    string name?;
    string nic?;
    time:Date birthDate?;
    string job?;
    string gender?;
|};

public type PersonTargetType typedesc<PersonOptionalized>;

public type PersonInsert Person;

public type PersonUpdate record {|
    int id?;
    string name?;
    time:Date birthDate?;
    string job?;
    string gender?;
|};

