// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerinax/persist.sql as psql;

const PERSON = "people";

public isolated client class Client {
    *persist:AbstractPersistClient;

    private final mysql:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [PERSON] : {
            entityName: "Person",
            tableName: "Person",
            fieldMetadata: {
                name: {columnName: "name"},
                nic: {columnName: "nic"},
                birthDate: {columnName: "birthDate"},
                job: {columnName: "job"},
                gender: {columnName: "gender"}
            },
            keyFields: ["nic"]
        }
    };

    public isolated function init() returns persist:Error? {
        mysql:Client|error dbClient = new (host = host, user = user, password = password, database = database, port = port, options = connectionOptions);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {[PERSON] : check new (dbClient, self.metadata.get(PERSON), psql:MYSQL_SPECIFICS)};
    }

    isolated resource function get people(PersonTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get people/[string nic](PersonTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post people(PersonInsert[] data) returns string[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(PERSON);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from PersonInsert inserted in data
            select inserted.nic;
    }

    isolated resource function put people/[string nic](PersonUpdate value) returns Person|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(PERSON);
        }
        _ = check sqlClient.runUpdateQuery(nic, value);
        return self->/people/[nic].get();
    }

    isolated resource function delete people/[string nic]() returns Person|persist:Error {
        Person result = check self->/people/[nic].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(PERSON);
        }
        _ = check sqlClient.runDeleteQuery(nic);
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

