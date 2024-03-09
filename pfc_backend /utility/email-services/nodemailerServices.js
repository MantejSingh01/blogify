const nodemailer = require('nodemailer');
const Models = require('../../models/index');
const config = require("config");
const md5 = require('md5');

// Create Nodemailer transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sheramantu@gmail.com', // Your email address
        pass: 'ogle zyha vzwv ygfj' // Your email password
    }
});

exports.sendConfirmationEmail = sendConfirmationEmail;
exports.onUserForgotPassword = onUserForgotPassword;

async function sendConfirmationEmail(payload) {
    try {
        let name = payload.name;

        // Compose email
        let mailOptions = {
            from: 'sheramantu@gmail.com', // Sender address
            to: payload.email, // Recipient address
            subject: 'Thanks for signing up.!', // Subject line
            html: `
            <!DOCTYPE html>
    <html>
    
    <head>
        <title>Thanks for signing up.</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=0">
    </head>
    
    <body style="font-family: Arial, Helvetica, sans-serif;position: relative;height: 100%;margin: 0 auto;">
        <div style="content: '';position: absolute;clip-path: polygon(0 1%, 100% 1%, 100% 51%, 0 84%);width: 100%;z-index: -1;"></div>
        <div class="wrap">
            <table style="background: #e2790a21;width: 70%;height: 90vh;box-shadow: 0 10px 24px 0 rgb(0,0,0,15%);border-top: 5px solid #e77802;margin: auto;">
                <tr>
                    <td style=" padding: 30px;">
                        <figure style="margin: 0 auto;width: 250px;">
                            <img src="https://emptyleg.s3.amazonaws.com/logo.png" style="width: 100%;">
                        </figure>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;
                    font-size: 25px;
                    color: #e77802;">Hello ${name}</td>
                </tr>
                <tr>
                    <td style="text-align: center;
                    font-size: 42px;
                    color: #0272ad;
                    font-weight: 600;">Nice to meet you.!</td>
                </tr>
                <tr>
                    <td>
                        <figure style="    width: 300px;
                        margin: 20px auto;">
                            <img src="https://emptyleg.s3.amazonaws.com/plane.png" style="width: 100%;">
                        </figure>
                    </td>
                </tr>
                <tr>
                    <td style="    color: #00000066;
                    font-size: 20px; padding:0 30px  ;
                    text-align: center;    padding-bottom: 5px;
                    margin: auto;">We are very pleased to have you onboard.</td>
                </tr>
                <tr>
                    <td style="    color: #00000066;
                    font-size: 20px;
                    text-align: center; padding:0 30px ;
                    margin: 20px 0;">Thank you.</td>
                </tr>
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>
                <tr style="background: #f3f6f8;">
                    <td>
                        <table style="    width: 100%;
                        padding: 30px;">
                            <tr>
                                <td style="text-align: center;
                            font-size: 18px;
                            color: #0272ad;
                            font-weight: 600;">Need Assistance? Contact Us!</td>
                            </tr>
                            <tr>
                                <td style="    color: #00000066;
                            font-size: 15px;
                            text-align: center;    padding-top: 10px;
                            margin: auto;">Phone Number : +91 7985145051</td>
                            </tr>
                            <tr>
                                <td style="    color: #00000066;
                            font-size: 15px;
                            text-align: center; 
                            margin: auto;">Email : contact@mantej.in</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    
    </html>
            `
        };

        // Send email
        let result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        return result;
    } catch (error) {
        console.log('errrr---', error);
        return error;
    }
}

async function onUserForgotPassword(payload) {
    try {
        const link = Models.LinkModel.findOne({ user: payload.id });
        if (link) await Models.LinkModel.findOneAndDelete({ _id: link._id });
        const query = await new Models.LinkModel({ user: payload.id }).save();
        let url = `http://localhost:3001/reset-password?link=${query._id}`;
        let name = payload.name;

        // Compose email
        let mailOptions = {
            from: 'sheramantu@gmail.com', // Sender address
            to: payload.email, // Recipient address
            subject: 'Reset your Password.!', // Subject line
            html: `
            <!DOCTYPE html>
    <html>
    
    <head>
        <title>Reset Password</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=0">
    </head>
    <style>
        .table {
            box-shadow: 0 10px 24px 0 rgb(0 0 0 / 15%);
            background: #e2790a21;
            width: 100%;
            height: 100vh;
            margin: auto;
        }
    </style>
    
    <body style="font-family: Arial, Helvetica, sans-serif;position: relative;height: 100%;margin: 0 auto;">
        <div style="content: '';position: absolute;clip-path: polygon(0 1%, 100% 1%, 100% 51%, 0 84%);z-index: -1;"></div>
        <div>
            <table class="table" style="background: #e2790a21;width: 70%;height: 90vh;box-shadow: 0 10px 24px 0 rgb(0,0,0,15%);border-top: 5px solid #e77802;margin: auto;">
                <tr>
                    <td style=" padding: 30px;">
                        <figure style="margin: 0 auto;width: 250px;">
                            <img src="https://emptyleg.s3.amazonaws.com/logo.png" style="width: 100%;">
                        </figure>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;font-size: 25px;color: #e77802;">Hello ${name}!</td>
                </tr>
                <tr>
                    <td style="text-align: center;font-size: 42px;color: #0272ad;font-weight: 600;">Forgot your password?</td>
                </tr>
                <tr>
                    <td>
                        <figure style="    width: 300px;
                        margin: 20px auto;">
                            <img src="https://emptyleg.s3.amazonaws.com/plane.png" style="width: 100%;">
                        </figure>
                    </td>
                </tr>
                <tr>
                    <td style="    color: #00000066;
                    font-size: 20px; padding:0 30px  ;
                    text-align: center;    padding-bottom: 5px;
                    margin: auto;">We have recieved a request to reset your account password.</td>
                </tr>
                <tr>
                    <td style="    color: #00000066;
                    font-size: 20px;
                    text-align: center; padding:0 30px ;
                    margin: auto;">Please click on the link below and follow the instructions.</td>
                </tr>
                <tr style="    text-align: center;">
                    <td><button style="background: #e77802;
                        color: #fff;
                        border: none;
                        padding: 10px 20px;
                        font-size: 17px;
                        border-radius: 100px;
                        margin: 20px 0 30px;"><a style="color: #fff; text-decoration: none;" href="${url}"
                                target="_blank">Reset Password</a></button></td>
                </tr>
                <tr style="    background: #f3f6f8;">
                    <td>
                        <table style="    width: 100%;
                        padding: 30px;">
                            <tr>
                                <td style="text-align: center;
                            font-size: 18px;
                            color: #0272ad;
                            font-weight: 600;">Not you? Contact Us!</td>
                            </tr>
                            <tr>
                                <td style="    color: #00000066;
                            font-size: 15px;
                            text-align: center;    padding-top: 10px;
                            margin: auto;">Phone Number : +91 7985145051</td>
                            </tr>
                            <tr>
                                <td style="    color: #00000066;
                            font-size: 15px;
                            text-align: center; 
                            margin: auto;">Email : contact@mantej.in</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    
    </html>
            `
        };

        // Send email
        let result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        return result;
    } catch (error) {
        console.log('errrr---', error);
        return error;
    }
}
