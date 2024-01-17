// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/time;

public type CertificateRequest record {|
    readonly string id;
    string nic;
    string address;
    string statusId;
    string userEmail;
    string userName;
    string assignedGramiEmail;
|};

public type CertificateRequestOptionalized record {|
    string id?;
    string nic?;
    string address?;
    string statusId?;
    string userEmail?;
    string userName?;
    string assignedGramiEmail?;
|};

public type CertificateRequestWithRelations record {|
    *CertificateRequestOptionalized;
    StatusOptionalized status?;
|};

public type CertificateRequestTargetType typedesc<CertificateRequestWithRelations>;

public type CertificateRequestInsert CertificateRequest;

public type CertificateRequestUpdate record {|
    string nic?;
    string address?;
    string statusId?;
    string userEmail?;
    string userName?;
    string assignedGramiEmail?;
|};

public type Status record {|
    readonly string id;
    time:Civil submitted;
    time:Civil? address_verified;
    time:Civil? approved;
    time:Civil? completed;
    time:Civil? rejected;
|};

public type StatusOptionalized record {|
    string id?;
    time:Civil submitted?;
    time:Civil? address_verified?;
    time:Civil? approved?;
    time:Civil? completed?;
    time:Civil? rejected?;
|};

public type StatusWithRelations record {|
    *StatusOptionalized;
    CertificateRequestOptionalized certificaterequest?;
|};

public type StatusTargetType typedesc<StatusWithRelations>;

public type StatusInsert Status;

public type StatusUpdate record {|
    time:Civil submitted?;
    time:Civil? address_verified?;
    time:Civil? approved?;
    time:Civil? completed?;
    time:Civil? rejected?;
|};

