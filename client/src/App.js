
import { useStateContext } from './contexts/ContextProvider';
import './css/App.css'
import React, { useEffect } from 'react'
import { getAccountDetails } from './service/user';
import Home from './pages/Home';
import {
Routes,
Route
} from 'react-router-dom'
import VerifyOTP from './components/VerifyOTP';
import Request from './components/Request';
import { ResetPassword } from './components/ResetPasword';

function App() {
  const { 
    setUserDetails,
    setStoredTask,
    setFilterState
  } = useStateContext()

 

  useEffect(() => {
    getAccountDetails(
      setUserDetails,
      setStoredTask,
      setFilterState
    )

    // eslint-disable-next-line
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/verify/:reason/:email' element={<VerifyOTP/>}/>
        <Route path='/request/:reason' element={<Request/>}/>
        <Route path='/forgot-password/:email' element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App