import React from 'react'
import Login from './Login';
import SignUp from './SignUp';
import photo from '../asset/todo.jpg'
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from '@mui/material';
import VerifyOTP from './VerifyOTP';
const Account = () => {
    const { isLogin, setIsLogin, isOtpEnter, setIsOtpEnter } = useStateContext()
    return (
        <div className=' px-4 flex w-screen h-screen items-center'>
            <div className='flex w-2/4 h-full items-center'>
                <img src={photo} className=' w-10/12' alt='' />
            </div>
            {isOtpEnter ?
                (<>
                    <VerifyOTP />
                </>) : (<div className=' m-4'>
                    {isLogin ? (<Login />) : (<SignUp />)}
                    <div className=' mt-8'>
                        <span className=' mr-1'>Create a new account </span>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                setIsLogin(!isLogin)
                            }}
                        >
                            {isLogin ? " Sign up" : "Login"}

                        </Link>
                    </div>
                </div>)}

        </div>
    )
}

export default Account
