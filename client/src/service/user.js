
//NOTE - Create anew account

import axios from "axios";
import { toast } from "react-toastify";
import { getAllTask } from "./task";
const userUrl = `${process.env.REACT_APP_BASEURL}/user`;
export const registerAccount = async (userDetails, navigate) => {
    try {
        const response = axios.post(`${userUrl}`, userDetails);

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
        navigate(`/verify/active-account/${userDetails.email}`)

    } catch (error) {
        toast.error(error?.response?.data.message || error.message);
    }
}

//Active account 
export const activateAccount = async (email, otp, setIsLogin) => {
    try {
        console.log(email, otp);
        const response = axios.patch(`${userUrl}/verify-email`, { email, otp });
        toast.promise(response, {
            pending: "Verifying ...",
            success: "Account activated successfully!",
            error: "Error verifying account"
        })
        setIsLogin((await response).data.success)
        return ((await response).data);
    } catch (error) {
        toast.error(error.response.data.message || error.message);
    }
}
//NOTE - Login user
export const loginAccount = async (
    loginDetails,
    setUserDetails,
    setStoredTask,
    setFilterState) => {
    const toastId = toast.loading("Login...")
    try {
        const response = await axios.post(`${userUrl}/login`, loginDetails, {
            withCredentials: true,
        });
        if (response.data.success) {

            getAccountDetails(
                setUserDetails,
                setStoredTask,
                setFilterState)
                toast.dismiss(toastId)

        }






    } catch (error) {
        toast.dismiss(toastId)
        toast.error(error?.response?.data.message || error.message);
    }
}
//NOTE - Log out user
export const logoutAccount = async (setUserDetails, setStoredTask) => {
    try {
        const response = await axios.get(`${userUrl}/logout`, {
            withCredentials: true,
        })
        console.log(response.data);
        setUserDetails(null)
        setStoredTask([]);
    } catch (error) {
        toast.error(error.response.data.message || error.message);
    }
}
//Gate login account details
export const getAccountDetails = async (
    setUserDetails,
    setStoredTask,
    setFilterState) => {
    try {
        const response = await axios.get(`${userUrl}`, {
            withCredentials: true
        });
        // console.log(response.data);
        const { id, email, userName, taskListId } = response?.data
        setUserDetails({ id, email, userName, taskListId });
        // setStoredTask(task);
        getAllTask(setStoredTask, setFilterState)


    } catch (error) {
        toast.error(error.response.data.message || error.message);
    }
}
//Forgot Password
export const forgotPassword = async (email, password, navigate) => {
    const toastId=toast.loading("Updating...")
    try {
        console.log(email, password);
        const response = await axios.patch(`${userUrl}/forgot-password`, { email, password });
        // console.log(response.data);
        if (response?.data.success) {
            toast.dismiss(toastId)
            toast.success("Password successfully update")
            navigate("/")
        }

    } catch (error) {
        toast.dismiss(toastId)
        toast.error("😒"+error?.response?.data.message || error.message);
    }
}


//NOTE - Resend OTP
export const resendOtp = async (email) => {
    const toastId=toast.loading("OTP sending...")
    try {
        const response = await axios.patch(`${userUrl}/resend-otp`, { email })
        toast.dismiss(toastId)
        toast.success(response.data.message, {
            autoClose: 3000
        })
        return response?.data.success;
    } catch (error) {
        toast.dismiss(toastId)
        toast.error(error?.response?.data.message || error.message);
        // toast.error(error.response.data.message || error.message);
    }
}
//NOTE - Verify OTP
export const verifyOtp = async (email, otp) => {
    const toastId=toast.loading("OTP verifying...")
    try {
        const response =await axios.patch(`${userUrl}/verify-otp`, { email, otp });
        toast.dismiss(toastId)
        toast.success("🚀 OTP successfully verified")
         return  response.data.success

    } catch (error) {
        toast.dismiss(toastId)
        toast.error("😒"+error?.response?.data.message || error.message);
    }
}

