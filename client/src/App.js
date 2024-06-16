import Account from './components/Account';
import AddTodo from './components/AddTodo'
import DisplayTask from './components/DisplayTask'
import { useStateContext } from './contexts/ContextProvider';
import './css/App.css'
import React, { useEffect, useState } from 'react'

function App() {
  const {isAuth}=useStateContext()
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

  }, [tasks])

  useEffect(() => {
    const localDate = new Date().toLocaleDateString();
    const [month, day, year] = localDate.split('/');
    const todayDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    setTasks(tasks.map((task) => {
      if ((new Date(task.dueDate)) < (new Date(todayDate)).setHours(0, 0, 0, 0)) {
        task.isTimeOver = true;
      }
      return task;
    }))
    // eslint-disable-next-line
  }, [])
  return (
    <div className='App'>
      {
        isAuth ? (<>
          <h2>ADD NEW TODO</h2>
          <AddTodo tasks={tasks} setTasks={setTasks} />
          <h2>ADDED TODO LIST</h2>
          <DisplayTask tasks={tasks} setTasks={setTasks} />
        </>) : (<>
          <Account />
        </>)
      }
 

    </div>
  )
}

export default App