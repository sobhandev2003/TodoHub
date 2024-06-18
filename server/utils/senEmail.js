
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const asyncHandler = require('express-async-handler')
const sendEmail = asyncHandler(async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASS
        }
    })
    const mailOption = {
        from: process.env.GMAIL_ID,
        to: email,
        subject: 'TodoHub',
        text: "Your OTP 👉 " + otp
    }

    await transporter.sendMail(mailOption);
}

)

module.exports = {
    sendEmail
}