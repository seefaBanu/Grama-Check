import ballerina/persist as _;
import ballerina/time;

type CertificateRequest record {|
    readonly string id;
    string nic;
    string address;
    string? checkedAddress;
    Status status;
    string userEmail;
    string userName;
    string assignedGramiEmail;
|};

type Status record {|
    readonly string id;
    time:Civil submitted;
    time:Civil? address_verified;
    time:Civil? approved;
    time:Civil? completed;
    time:Civil? rejected;
    CertificateRequest? certificaterequest;
|};

type GramaDivision record {|
    readonly string id;
    string gnDivision;
    string province;
    string district;
    string divisionalSecretariat;
    string gramiEmail;
|};
