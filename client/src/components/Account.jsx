import React from 'react'
import Login from './Login';
import SignUp from './SignUp';
import photo from '../asset/todo.jpg'
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from '@mui/material';
const Account = () => {
    const { isLogin, setIsLogin} = useStateContext()
    return (
        <div className=' px-4 flex w-screen h-screen items-center'>
            <div className='flex w-2/4 h-full items-center lg:w-3/4 md:hidden'>
                <img src={photo} className=' w-10/12' alt='' />
            </div>
            <div className=' m-4'>
                {isLogin ? (<Login />) : (<SignUp />)}
                <div className=' mt-8'>

                    <span className=' mr-1'>{isLogin ? "Create a new account " : "I have a account "} </span>
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
            </div>
        </div>
    )
}

export default Account
