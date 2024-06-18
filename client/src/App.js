
import { useStateContext } from './contexts/ContextProvider';
import './css/App.css'
import React, { useEffect, useState } from 'react'
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
    userDetails,
    setUserDetails,
    storedTask,
    setStoredTask,
    setFilterState
  } = useStateContext()
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  });

 

  useEffect(() => {
    getAccountDetails(
      setUserDetails,
      setStoredTask,
      setFilterState
    )

    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    setTasks(storedTask)
  }, [storedTask])
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