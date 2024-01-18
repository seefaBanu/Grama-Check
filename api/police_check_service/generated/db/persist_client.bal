// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerinax/persist.sql as psql;

const CITIZEN = "citizens";
const POLICE_CASE = "policecases";

public isolated client class Client {
    *persist:AbstractPersistClient;

    private final mysql:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [CITIZEN] : {
            entityName: "Citizen",
            tableName: "Citizen",
            fieldMetadata: {
                nic: {columnName: "nic"},
                "policecase[].caseId": {relation: {entityName: "policecase", refField: "caseId"}},
                "policecase[].citizenNic": {relation: {entityName: "policecase", refField: "citizenNic"}},
                "policecase[].issue": {relation: {entityName: "policecase", refField: "issue"}},
                "policecase[].date": {relation: {entityName: "policecase", refField: "date"}}
            },
            keyFields: ["nic"],
            joinMetadata: {policecase: {entity: PoliceCase, fieldName: "policecase", refTable: "PoliceCase", refColumns: ["citizenNic"], joinColumns: ["nic"], 'type: psql:MANY_TO_ONE}}
        },
        [POLICE_CASE] : {
            entityName: "PoliceCase",
            tableName: "PoliceCase",
            fieldMetadata: {
                caseId: {columnName: "caseId"},
                citizenNic: {columnName: "citizenNic"},
                issue: {columnName: "issue"},
                date: {columnName: "date"},
                "citizen.nic": {relation: {entityName: "citizen", refField: "nic"}}
            },
            keyFields: ["caseId"],
            joinMetadata: {citizen: {entity: Citizen, fieldName: "citizen", refTable: "Citizen", refColumns: ["nic"], joinColumns: ["citizenNic"], 'type: psql:ONE_TO_MANY}}
        }
    };

    public isolated function init() returns persist:Error? {
        mysql:Client|error dbClient = new (host = host, user = user, password = password, database = database, port = port, options = connectionOptions);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {
            [CITIZEN] : check new (dbClient, self.metadata.get(CITIZEN), psql:MYSQL_SPECIFICS),
            [POLICE_CASE] : check new (dbClient, self.metadata.get(POLICE_CASE), psql:MYSQL_SPECIFICS)
        };
    }

    isolated resource function get citizens(CitizenTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get citizens/[string nic](CitizenTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post citizens(CitizenInsert[] data) returns string[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(CITIZEN);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from CitizenInsert inserted in data
            select inserted.nic;
    }

    isolated resource function put citizens/[string nic](CitizenUpdate value) returns Citizen|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(CITIZEN);
        }
        _ = check sqlClient.runUpdateQuery(nic, value);
        return self->/citizens/[nic].get();
    }

    isolated resource function delete citizens/[string nic]() returns Citizen|persist:Error {
        Citizen result = check self->/citizens/[nic].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(CITIZEN);
        }
        _ = check sqlClient.runDeleteQuery(nic);
        return result;
    }

    isolated resource function get policecases(PoliceCaseTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get policecases/[int caseId](PoliceCaseTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post policecases(PoliceCaseInsert[] data) returns int[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(POLICE_CASE);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from PoliceCaseInsert inserted in data
            select inserted.caseId;
    }

    isolated resource function put policecases/[int caseId](PoliceCaseUpdate value) returns PoliceCase|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(POLICE_CASE);
        }
        _ = check sqlClient.runUpdateQuery(caseId, value);
        return self->/policecases/[caseId].get();
    }

    isolated resource function delete policecases/[int caseId]() returns PoliceCase|persist:Error {
        PoliceCase result = check self->/policecases/[caseId].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(POLICE_CASE);
        }
        _ = check sqlClient.runDeleteQuery(caseId);
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

