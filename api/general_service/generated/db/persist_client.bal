// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerinax/persist.sql as psql;

const CERTIFICATE_REQUEST = "certificaterequests";
const STATUS = "statuses";

public isolated client class Client {
    *persist:AbstractPersistClient;

    private final mysql:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [CERTIFICATE_REQUEST] : {
            entityName: "CertificateRequest",
            tableName: "CertificateRequest",
            fieldMetadata: {
                id: {columnName: "id"},
                nic: {columnName: "nic"},
                address: {columnName: "address"},
                statusId: {columnName: "statusId"},
                userEmail: {columnName: "userEmail"},
                userName: {columnName: "userName"},
                assignedGramiEmail: {columnName: "assignedGramiEmail"},
                "status.id": {relation: {entityName: "status", refField: "id"}},
                "status.submitted": {relation: {entityName: "status", refField: "submitted"}},
                "status.address_verified": {relation: {entityName: "status", refField: "address_verified"}},
                "status.approved": {relation: {entityName: "status", refField: "approved"}},
                "status.completed": {relation: {entityName: "status", refField: "completed"}},
                "status.rejected": {relation: {entityName: "status", refField: "rejected"}}
            },
            keyFields: ["id"],
            joinMetadata: {status: {entity: Status, fieldName: "status", refTable: "Status", refColumns: ["id"], joinColumns: ["statusId"], 'type: psql:ONE_TO_ONE}}
        },
        [STATUS] : {
            entityName: "Status",
            tableName: "Status",
            fieldMetadata: {
                id: {columnName: "id"},
                submitted: {columnName: "submitted"},
                address_verified: {columnName: "address_verified"},
                approved: {columnName: "approved"},
                completed: {columnName: "completed"},
                rejected: {columnName: "rejected"},
                "certificaterequest.id": {relation: {entityName: "certificaterequest", refField: "id"}},
                "certificaterequest.nic": {relation: {entityName: "certificaterequest", refField: "nic"}},
                "certificaterequest.address": {relation: {entityName: "certificaterequest", refField: "address"}},
                "certificaterequest.statusId": {relation: {entityName: "certificaterequest", refField: "statusId"}},
                "certificaterequest.userEmail": {relation: {entityName: "certificaterequest", refField: "userEmail"}},
                "certificaterequest.userName": {relation: {entityName: "certificaterequest", refField: "userName"}},
                "certificaterequest.assignedGramiEmail": {relation: {entityName: "certificaterequest", refField: "assignedGramiEmail"}}
            },
            keyFields: ["id"],
            joinMetadata: {certificaterequest: {entity: CertificateRequest, fieldName: "certificaterequest", refTable: "CertificateRequest", refColumns: ["statusId"], joinColumns: ["id"], 'type: psql:ONE_TO_ONE}}
        }
    };

    public isolated function init() returns persist:Error? {
        mysql:Client|error dbClient = new (host = host, user = user, password = password, database = database, port = port, options = connectionOptions);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {
            [CERTIFICATE_REQUEST] : check new (dbClient, self.metadata.get(CERTIFICATE_REQUEST), psql:MYSQL_SPECIFICS),
            [STATUS] : check new (dbClient, self.metadata.get(STATUS), psql:MYSQL_SPECIFICS)
        };
    }

    isolated resource function get certificaterequests(CertificateRequestTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get certificaterequests/[string id](CertificateRequestTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post certificaterequests(CertificateRequestInsert[] data) returns string[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(CERTIFICATE_REQUEST);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from CertificateRequestInsert inserted in data
            select inserted.id;
    }

    isolated resource function put certificaterequests/[string id](CertificateRequestUpdate value) returns CertificateRequest|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(CERTIFICATE_REQUEST);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/certificaterequests/[id].get();
    }

    isolated resource function delete certificaterequests/[string id]() returns CertificateRequest|persist:Error {
        CertificateRequest result = check self->/certificaterequests/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(CERTIFICATE_REQUEST);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get statuses(StatusTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get statuses/[string id](StatusTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post statuses(StatusInsert[] data) returns string[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(STATUS);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from StatusInsert inserted in data
            select inserted.id;
    }

    isolated resource function put statuses/[string id](StatusUpdate value) returns Status|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(STATUS);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/statuses/[id].get();
    }

    isolated resource function delete statuses/[string id]() returns Status|persist:Error {
        Status result = check self->/statuses/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(STATUS);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    remote isolated function queryNativeSQL(sql:ParameterizedQuery sqlQuery, typedesc<record {}> rowType = <>) returns stream<rowType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    remote isolated function executeNativeSQL(sql:ParameterizedQuery sqlQuery) returns psql:ExecutionResult|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    public isolated function close() returns persist:Error? {
        error? result = self.dbClient.close();
        if result is error {
            return <persist:Error>error(result.message());
        }
        return result;
    }
}

