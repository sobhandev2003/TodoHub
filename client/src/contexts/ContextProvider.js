import { createContext, useContext, useState } from "react";


const stateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userDetails, setUserDetails] = useState(null)
    const [storedTask, setStoredTask] = useState(null)
    const [filterState, setFilterState] = useState("all")

    return (
        <stateContext.Provider value={{
            isLogin,
            setIsLogin,         
            userDetails,
            setUserDetails,
            storedTask,
            setStoredTask,
            filterState,
            setFilterState
        }}
        >{children}</stateContext.Provider>
    )
}


export const useStateContext = () => useContext(stateContext)