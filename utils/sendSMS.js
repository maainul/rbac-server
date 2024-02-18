// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC0e1b60a9a559fa323e54741bd90dc345";
const authToken = "44c234ed3e2e8b85b53eb39aa24906fa";
const verifySid = "VAbe4dacfacd4239994f335d6d052a89a0";
const client = require("twilio")(accountSid, authToken);

client.verify.v2
    .services(verifySid)
    .verifications.create({ to: "+01990181448", channel: "sms" })
    .then((verification) => console.log(verification.status))
    .then(() => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        readline.question("Please enter the OTP:", (otpCode) => {
            client.verify.v2
                .services(verifySid)
                .verificationChecks.create({ to: "+8801742503080", code: otpCode })
                .then((verification_check) => console.log(verification_check.status))
                .then(() => readline.close());
        });
    });