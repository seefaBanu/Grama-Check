import ballerina/http;



public type MessageDTO record {|
    string receiver;
    string message;
|};

service /message\-client on new http:Listener(9090) {
  resource function post .(MessageDTO messageDto) returns http:InternalServerError |http:Ok  {
    error? response = sendMessage(messageDto.receiver,messageDto.message);
    if response is error {
      return http:INTERNAL_SERVER_ERROR;
    }
    else {
      return http:OK;
    }
  }
    
}
