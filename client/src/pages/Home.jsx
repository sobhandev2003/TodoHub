import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import Nav from '../components/Nav'
import DisplayTask from '../components/DisplayTask'
import Account from '../components/Account'
import AddTodo from '../components/AddTodo'

function Home() {
    const {userDetails}=useStateContext()
  return (
    <>
       {
        userDetails ? (<>
          <Nav />
          <h2>ADD NEW TODO</h2>
          <AddTodo />
          <h2>ADDED TODO LIST</h2>
          <DisplayTask />
        </>) : (<>
          <Account />
        </>)
      }
    </>
  )
}

export default Home
