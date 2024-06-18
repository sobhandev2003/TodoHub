import '../css/DisplayTask.css'
import React, { useEffect, useState } from 'react'
import { MdPendingActions } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import emptyLogo from '../asset/emty_logo.png'
import {
  deleteTask,
  getAllTask,
  getCompletedTask,
  getPendingTask,
  getTodayTask,
  updateTaskMarkAsComplete
} from '../service/task';
import { useStateContext } from '../contexts/ContextProvider';
import loadingAnimation from '../asset/loading.gif'
function DisplayTask() {
  const [displayTask, setDisplayTask] = useState([])
  const { setStoredTask, storedTask, filterState, setFilterState } = useStateContext()

  //NOTE - Handel update completion status
  const updateTaskCompleteStatus = (taskId) => {
    updateTaskMarkAsComplete(taskId, setStoredTask, setFilterState, filterState)
  }
  //NOTE -Handel delete a task
  const handelDeleteTask = (taskId) => {
    deleteTask(taskId, setStoredTask, setFilterState, filterState)
  }

  //NOTE - clear all filter
  const clearAllFilter = () => {
    getAllTask(setStoredTask, setFilterState)

  }
  //NOTE - Pending task
  const pendingTaskFilter = () => {
    getPendingTask(setStoredTask, setFilterState)
  }
  //NOTE - completed task
  const completedTaskFilter = () => {
    getCompletedTask(setStoredTask, setFilterState)
  }
  //NOTE -Filter Today task
  const todayTaskFilter = () => {
    getTodayTask(setStoredTask, setFilterState)
  }

  const handelSearchTaskByName = (e) => {
    const searchValue = e.target.value.trim();
    storedTask && setDisplayTask(storedTask.filter((task) => task.taskName.toLowerCase().includes(searchValue.toLowerCase())))
  }

  useEffect(() => {
    setDisplayTask(storedTask)
  }, [storedTask])


  return (
    <div className='display-container'>
      <div className='filter-btn-container'>
        <button className={`${filterState === "all" ? "applied-filter-btn" : "filter-btn"}`} onClick={clearAllFilter}>All</button>
        <button className={`${filterState === "pending" ? "applied-filter-btn" : "filter-btn"}`} onClick={pendingTaskFilter}>Pending</button>
        <button className={`${filterState === "completed" ? "applied-filter-btn" : "filter-btn"}`} onClick={completedTaskFilter}>Completed</button>
        <button className={`${filterState === "today" ? "applied-filter-btn" : "filter-btn"}`} onClick={todayTaskFilter}>Today Task</button>


        <div className="search-bar">
          <input type="search" name="search" pattern=".*\S.*" onChange={handelSearchTaskByName} required />
          <button className="search-btn" type="submit">
            <span>Search</span>
          </button>
        </div>

      </div>
      {
        displayTask ? (displayTask.length > 0 ? <>{
          displayTask.map((task, index) => (
            <div key={task._id} className="task-container">
              {task.isTimeOver && <p className='time-over-cut'></p>}
              <p className='task-index'>{index + 1}</p>
              <p className='task-name'> {task.taskName}</p>
              <p className='due-date'>{task.dueDate.split("T")[0]}</p>
              <p className='due-time'>{task.dueDate.split("T")[1]}</p>
              <p className='is-done-icon-para'>{task.isDone ? <IoCheckmarkDoneCircle className='completed-icon' /> : <MdPendingActions className='pending-icon' />}</p>
              <button className='mark-complete-btn' disabled={task.isDone || task.isTimeOver} onClick={() => updateTaskCompleteStatus(task._id)} >{task.isDone ? "Completed" : "Marked as Complete"}</button>
              <p className='z-10'><MdDelete className='delete-btn' onClick={() => handelDeleteTask(task._id)} /></p>
            </div>
          ))
        }</> : <>
          <img src={emptyLogo} alt="" />
          <h2 className='empty-heading'>EMPTY</h2>
        </>) : <>
          <img src={loadingAnimation} alt="Loading....." />
        </>
      }

    </div>
  )
}

export default DisplayTask