import '../css/AddTodo.css'
import React, { useEffect, useState } from 'react'
import ResponsiveDatePickers from './ResponsiveDatePickers';
import TextFields from './TextFields';
import { addNewTask } from '../service/task';
import { useStateContext } from '../contexts/ContextProvider';
function AddTodo() {

    const [newTaskName, setNewTaskName] = useState("");
    const [newDueDate, setNewDueDate] = useState(new Date().toLocaleDateString());
    const { setStoredTask, setFilterState } = useStateContext()

    const [errorMsg, setErrorMsg] = useState({
        taskNameError: "",
        dueDateError: ""
    })
    const [isTouched, setIsTouched] = useState({
        taskName: false,
        dueDate: false
    })
    const produceError = () => {
        setErrorMsg({
            taskNameError: newTaskName.trim() === "" ? "Task name is required" : "",
            dueDateError: newDueDate.trim() === "" ? "Due date is required" : ""
        })

    }
    const handelAddNewTask = () => {
        if (newTaskName.trim() === "" || newDueDate.trim() === "") {
            setIsTouched({
                taskName: true,
                dueDate: true
            })
            produceError()
        }
        else {
            const taskData = {
                taskName: newTaskName,
                dueDate: newDueDate
            }
            addNewTask(taskData, setStoredTask, setFilterState)
            setNewTaskName("");

        }
    }

    useEffect(() => {
        produceError()
        // eslint-disable-next-line
    }, [newTaskName, newDueDate])


    return (
        <div className='add-todo-container'>
            <div className='input-container'>
                <TextFields label={"Task Name"} setTaskName={setNewTaskName} />
                {errorMsg.taskNameError && isTouched.taskName && <span className='error'>{errorMsg.taskNameError}</span>}
            </div>

            <div className='input-container'>
                <ResponsiveDatePickers label="Due date" todayDate={newDueDate} setDate={setNewDueDate} />
                {errorMsg.dueDateError && isTouched.dueDate && <span className='error'>{errorMsg.dueDateError}</span>}
            </div>

            <button type='button' className='add-btn' onClick={handelAddNewTask}>ADD  &#x2b;</button>
        </div>
    )
}

export default AddTodo