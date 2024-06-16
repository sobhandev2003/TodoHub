import React, { useEffect, useState } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Button } from '@mui/material'
import { useStateContext } from '../contexts/ContextProvider'
import { activateAccount, resendOtp } from '../service/user'
const VerifyOTP = () => {
    const { 
        setIsLogin,
        setIsOtpEnter,
        isAccountVerify,
        setISAccountVerify,
        isForgotPassword,
        setIsForgotPassword,
        verifyEmail,
        setVerifyEmail } = useStateContext()
    const [otp, setOtp] = useState('')
    const handelVerifyOtp = () => {
        if (isAccountVerify) {
            activateAccount(verifyEmail,otp,setIsOtpEnter,setVerifyEmail,setISAccountVerify,setIsLogin)
        }
        else if (isForgotPassword) {

        }
    }

    const handelResendOTP=()=>{
        resendOtp(verifyEmail);
    }
    
    const handleChange = (newValue) => {
        setOtp(newValue)
    }
    useEffect(() => {
        if (otp.length === 4) {
            handelVerifyOtp()
        }
    }, [otp])

    return (
        <div>
            <h1>Verify OTP</h1>
            <p>**NOTE : Don't reload the page.</p>
            <MuiOtpInput value={otp} onChange={handleChange} style={{ width: "25rem" }} />

            <Button variant="contained" color='primary' type="submit" disabled={otp.length !== 4} onClick={handelVerifyOtp}>Verify</Button>
            <Button color='secondary' variant='outlined' onClick={ handelResendOTP}>Resend </Button>
        </div>
    )
}

export default VerifyOTP
