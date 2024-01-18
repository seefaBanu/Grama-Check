import ballerinax/twilio;


configurable string accountSid = "AC47bca5c941dcd2f646a68480ef847ccd";
configurable string authToken = "3f5a4d13a205de2fb08d241d7eb5d955";

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
