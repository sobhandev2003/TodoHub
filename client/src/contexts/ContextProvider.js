import { createContext, useContext, useState } from "react";


const stateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isOtpEnter, setIsOtpEnter] = useState(false)
    const [isAccountVerify, setISAccountVerify] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(null);
    return (
        <stateContext.Provider value={{
            isAuth,
            setIsAuth,
            isLogin,
            setIsLogin,
            isOtpEnter,
            setIsOtpEnter,
            isAccountVerify,
            setISAccountVerify,
            isForgotPassword,
            setIsForgotPassword,
            verifyEmail,
            setVerifyEmail
        }}
        >{children}</stateContext.Provider>
    )
}


export const useStateContext = () => useContext(stateContext)