import React, { useEffect, useState } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Button } from '@mui/material'
import { useStateContext } from '../contexts/ContextProvider'
import { activateAccount, resendOtp, verifyOtp } from '../service/user'
import { useNavigate, useParams } from 'react-router-dom'
import { RiVerifiedBadgeFill } from "react-icons/ri";
const VerifyOTP = () => {
    const navigate = useNavigate();
    const params = useParams()
    const {
        setIsLogin,
    } = useStateContext()
    const { email, reason } = params;
    const [otp, setOtp] = useState('')
    const [isVerify, setIsVerify] = useState(false)
    const [VerifyMsg, setVerifyMsg] = useState(null)

    const handelVerifyOtp = async () => {
        if (reason.toLocaleLowerCase() === "active-account") {
            const res = await activateAccount(email, otp, setIsLogin)
            console.log(res);
            if (res && res?.success) {
                setIsVerify(res.success);
                setVerifyMsg(res.message);
            }
        }
        else if (reason.toLocaleLowerCase() === "forgot-password") {
            const res =await verifyOtp(email, otp)
            console.log(res);
            if (res) {
                navigate(`/forgot-password/${email}`)
            }
        }

    }

    const handelResendOTP = () => {
        resendOtp(email);
    }

    const handleChange = (newValue) => {
        setOtp(newValue)
    }
    useEffect(() => {
        if (otp.length === 4) {
            handelVerifyOtp()
        }
        // eslint-disable-next-line
    }, [otp])

    return (
        <div className=' w-screen flex flex-col justify-center'>{
            !isVerify ? (<div className='flex flex-col justify-center items-center gap-4'>
                <h1 className='w-fit text-5xl font-roboto-condensed text-006266'>Verify OTP</h1>
                <MuiOtpInput value={otp} onChange={handleChange} style={{ width: "25rem" }} />
                <div className='flex gap-6'>
                    <Button variant="contained" color='primary' type="submit" disabled={otp.length !== 4} onClick={handelVerifyOtp}>Verify</Button>
                    <Button color='secondary' variant='outlined' onClick={handelResendOTP}>Resend </Button>
                </div>
            </div>) : (
                <div className='w-screen flex flex-col items-center gap-8'>
                    <RiVerifiedBadgeFill color="#20bf6b" fontSize={"5rem"} />
                    {VerifyMsg && <p className=' font-playfair-display text-4xl'>{VerifyMsg}</p>}
                </div>
            )

        }
            <Button onClick={() => navigate("/")}>Back To Home</Button>
        </div>
    )
}

export default VerifyOTP
