const express=require('express')
const { registerNewUser, loginUser, loginUserDetails, verifyEmail, resendOtp } = require('../controllers/userControllers')
const { validateAuthToken } = require('../middilware/validateAuthToken')

const Router=express.Router()

Router.route("/").post(registerNewUser)
Router.route("/login").post(loginUser)
Router.route("/").get(validateAuthToken,loginUserDetails)
Router.route("/verify-email").patch(verifyEmail)
Router.route("/resend-otp").patch(resendOtp);

module.exports=Router

