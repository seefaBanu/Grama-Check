import ballerinax/twilio;


configurable string accountSid = ?;
configurable string authToken = ?;

twilio:ConnectionConfig twilioConfig = {
auth: {
username: accountSid,
password: authToken
}
};

twilio:Client twilio = check new (twilioConfig);


public function sendMessage(string receiver,string message) returns twilio:Message|error {
twilio:CreateMessageRequest messageRequest = {
To: receiver, 
From: "+16088075482",
Body: message
};

twilio:Message response = check twilio->createMessage(messageRequest);
return response;
}
