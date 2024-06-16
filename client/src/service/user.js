
//NOTE - Create anew account

import axios from "axios";
import { toast } from "react-toastify";
const userUrl = `${process.env.REACT_APP_BASEURL}/user`;
export const registerAccount = async (userDetails, setIsOtpEnter, setISAccountVerify, setVerifyEmail) => {
    try {
        console.log(userDetails);
        const response = axios.post(`${userUrl}`, userDetails);
        // console.log(response);
        toast.promise(response, {
            pending: "Creating account...",
            success: "🚀 Account created successfully!",
            error: "Error creating account"
        })
        const data = (await response).data;
        toast.info(data.info, {
            delay: 1000,
            autoClose: 6000
        })
        setIsOtpEnter(data.success)
        setISAccountVerify(data.success)
        setVerifyEmail(userDetails.email);
    } catch (error) {
        console.error(error);
    }
}

//Active account 
export const activateAccount = async (email, otp, setIsOtpEnter, setVerifyEmail, setISAccountVerify, setIsLogin) => {
    try {
        console.log(email, otp);
        const response = await axios.patch(`${userUrl}/verify-email`, { email, otp });
        toast.success(response.data.message);
        setIsOtpEnter(!response.data.success)
        setISAccountVerify(!response.data.success)
        setVerifyEmail(null)
        setIsLogin(response.data.success)
    } catch (error) {
        toast.error(error.response.data.message || error.message);
    }
}
//NOTE - Login user
export const loginAccount = async (loginDetails, setIsAuth) => {
    console.log(loginDetails);
    try {
        const response = axios.post(`${userUrl}/login`,loginDetails);
        toast.promise(response, {
            pending: "Logging in...",
            success: "Logged in successfully!",
            error: "Error logging in"
        })
        console.log((await response));
        // const data = (await response).data;
        // setIsAuth(data.success)
        // console.log(data);
        // getAccountDetails()

    } catch (error) {
        console.error(error);
        // toast.error(error.response.data.message || error.message)
    }
}
//Gate login account details
export const getAccountDetails = async () => {
    try {
        const response=await axios.get(`${userUrl}`,{
            withCredentials:true
        });
        console.log(response.data);
        
    } catch (error) {
        console.log(error);
    }
}

//NOTE - Resend OTP
export const resendOtp = async (email) => {
    try {
        const response = await axios.patch(`${userUrl}/resend-otp`, { email })
        console.log(response.data);
        toast.success(response.data.message, {
            autoClose: 3000
        })
    } catch (error) {
        
        // toast.error(error.response.data.message || error.message);
    }
}

