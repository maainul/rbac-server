
// dotenv.config()

// var SibApiV3Sdk = require('sib-api-v3-sdk');
// var defaultClient = SibApiV3Sdk.ApiClient.instance;

// // Configure API key authorization: api-key
// var apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = "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"


// var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email


// const sendMail = async (email, verificationCode) => {
//     sendSmtpEmail = {
//         to: [{
//             email: email,
//             // name: email
//         }],
//         templateId: 1,
//         params: {
//             name: email,
//             // surname: 'Hasan',
//             verification_code: verificationCode
//         },
//         headers: {
//             'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
//         }
//     }
//     try {
//         const data = apiInstance.sendTransacEmail(sendSmtpEmail);
//         return {
//             success: true,
//             message: 'Mail Send Successfully',
//             data: data
//         }
//     }
//     catch (error) {
//         return {
//             success: false,
//             message: 'Mail Send Failed',
//             data: error
//         }
//     }
// }


// export default sendMail