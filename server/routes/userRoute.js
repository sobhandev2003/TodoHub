const express=require('express')
const { registerNewUser, loginUser, loginUserDetails, verifyEmail, resendOtp, logoutUser, resetPassword, verifyOtp } = require('../controllers/userControllers')
const { validateAuthToken } = require('../middilware/validateAuthToken')

const Router=express.Router()

Router.route("/").post(registerNewUser)
Router.route("/login").post(loginUser)
Router.route("/logout").get(validateAuthToken,logoutUser)
Router.route("/").get(validateAuthToken,loginUserDetails)
Router.route("/verify-email").patch(verifyEmail)
Router.route("/resend-otp").patch(resendOtp);
Router.route("/verify-otp").patch(verifyOtp);
Router.route("/forgot-password").patch(resetPassword)

module.exports=Router

