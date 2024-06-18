const mongoose = require('mongoose')
const { validateEmail } = require('../utils/validator')
const cron = require('node-cron');
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        expires: 60 * 10, // This will make the documents expire after 10 seconds of createdAt timestamp
        default: Date.now
    }
}, {
    timestamps: true,
})
const OTP = mongoose.model("OTP", otpSchema);
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User name required"],
        min: 3
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: [true, "Email already register"],
        validate: {
            validator: validateEmail,
            message: 'Invalid email address format'
        },

    },
    password: {
        type: String,
        required: [true, "Password required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otpId: {
        type: mongoose.Schema.ObjectId,
        type: String,
        ref: "OTP",
        default: null
    }
},
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);

const deleteNotVerifiedAccount = async () => {
    try {
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        await User.deleteMany({
            isVerified: false,
            createdAt: { $lt: oneDayAgo },
        });


    } catch (error) {
        // console.log("something wrong")
    }
}

// Schedule the function to run every day at 12:00 AM local time
cron.schedule('0 0 * * *', deleteNotVerifiedAccount);

module.exports = {
    User,
    OTP
}