const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
const { TaskList } = require('../models/taskModel');
const { validateEmail, containsSpace } = require('../utils/validator');
const { User, OTP } = require('../models/userModel');
const { sendEmail } = require('../utils/senEmail');
//NOTE - Register new user account
const registerNewUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (
        !userName ||
        !email ||
        !password ||
        password.length < 4 ||
        containsSpace(password) ||
        !validateEmail(email)
    ) {
        res.status(400)
        throw new Error('Invalid input')
    }
    const exitUser = await User.findOne({ email });
    if (exitUser) {
        res.status(409)
        throw new Error('Email already exists')
    }
    const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS))
    const user = await User.create({
        userName,
        email,
        password: hashPassword
    });

    const response = await handelOTPSend(user, email);
    await user.save()
    res.status(201).json({
        success: true,
        message: 'User created successfully.',
        info: "Account activation OTP sent on your mail."
    })
})

//NOTE - Verify user email
const verifyEmail = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        res.status(400)
        throw new Error('Invalid input')
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    if (user.isVerified) {
        res.status(400)
        throw new Error('Email already verified')
    }
    await handelVerifyOTP(email, user.otpId, otp)
    const exitOTP = await OTP.findById(user.otpId);
    if (!exitOTP || !exitOTP.isVerified) {
        res.status(400)
        throw new Error("Invalid OTP")
    }
    user.isVerified = true
    user.otpId = null;
    await user.save()

    await TaskList.create({
        userId: user._id,
    })
    res.status(200).json({
        success: true,
        message: 'Email verified successfully'
    });
})

//NOTE - Login user account
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error('Invalid input')
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    if (!user.isVerified) {
        res.status(401)
        throw new Error('Email not verified')
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        res.status(401)
        throw new Error('Invalid password or Email')
    }

    const jwtToken = jwt.sign({
        id: user._id,
        email: user.email
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '30d' }
    )

    const cookieOption = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true
    }
    res
        .status(200)
        .cookie("jwtToken", jwtToken, cookieOption)
        .json({ success: true, jwtToken })
})
//NOTE - Log out login user
const logoutUser = asyncHandler(async (req, res) => {
    const cookieOption = {
        path: "/",
        sameSite: "none",
        secure: true
    }
    res.status(200).clearCookie("jwtToken", cookieOption).json({ success: true, message: "User log out." })

})
//NOTE - Gate login user details
const loginUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    const taskList = await TaskList.findOne({ userId: user._id })
    if (!taskList) {
        res.status(404)
        throw new ("Account not verified")
    }
    res.status(200).json({
        id: user._id,
        userName: user.userName,
        email: user.email,
        taskListId: taskList._id,
    })
})



//NOTE - Verify OTP
const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    await handelVerifyOTP(email, user.otpId, otp)
    const exitOTP = await OTP.findById(user.otpId);
    if (!exitOTP || !exitOTP.isVerified) {
        res.status(400)
        throw new Error("Invalid OTP")
    }
    res.status(200).json({ success: true, message: "OTP successfully verified" })


})


//NOTE - Reset password
const resetPassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password || password.length < 4 || containsSpace(password)) {
        res.status(400)
        throw new Error('Invalid input')
    }
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    if (!user.isVerified) {
        res.status(400)
        throw new Error('Account not verified')
    }

    const exitOTP = await OTP.findById(user.otpId);
    if (!exitOTP) {
        res.status(400);
        throw new Error('Request time out.');
    }
    if (!exitOTP.isVerified) {
        res.status(400);
        throw new Error('Not verified');
    }
    const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS))
    user.password = hashPassword
    await user.save()
    res.status(200).json({ success: true })

})
//NOTE - Resend otp
const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.status(400)
        throw new Error("Invalid request.")
    }
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    const response = await handelOTPSend(user, email);
    await user.save()
    res.status(200).json({
        ...response
    })

})

//NOTE -Function to request a password change and send an OTP to the user's email
const handelOTPSend = asyncHandler(async (user, email) => {
    const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const dbOtp = await OTP.create({
        email,
        otp
    })
    await sendEmail(email, otp)
    user.otpId = dbOtp._id;
    return {
        success: true,
        message: 'OTP sent successfully',
    }
})
//NOTE - VEry OTP
const handelVerifyOTP = asyncHandler(async (email, otpId, otp) => {
    const exitOTP = await OTP.findById(otpId);
    if (!exitOTP) {
        return;
    }
    if (exitOTP.otp !== otp || exitOTP.email !== email || exitOTP.isVerified) {
        return;
    }
    exitOTP.isVerified = true;
    await exitOTP.save();

})
module.exports = {
    registerNewUser,
    loginUser,
    logoutUser,
    loginUserDetails,
    verifyEmail,
    resetPassword,
    resendOtp,
    verifyOtp
}