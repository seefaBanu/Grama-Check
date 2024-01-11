import ballerina/persist as _;
import ballerina/time;

type CertificateRequest record {|
    readonly string id;
    string nic;
    string address;
    Status status;
    string userEmail;
    string assignedGramiEmail;
|};

type Status record {|
    readonly string id;
    time:Civil submitted;
    time:Civil? address_verified;
    time:Civil? approved;
    CertificateRequest? certificaterequest;
|};

