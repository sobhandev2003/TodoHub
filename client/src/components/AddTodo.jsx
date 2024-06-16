import '../css/AddTodo.css'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import ResponsiveDatePickers from './ResponsiveDatePickers';
import TextFields from './TextFields';
function AddTodo({ tasks, setTasks }) {
    const [newTaskName, setNewTaskName] = useState("");
    const [newDueDate, setNewDueDate] = useState(new Date().toLocaleString().split(",")[0]);

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
    const addNewTask = () => {
        if (newTaskName.trim() === "" || newDueDate.trim() === "") {
            setIsTouched({
                taskName: true,
                dueDate: true
            })
            produceError()
        }
        else {
            const currentTime = new Date();
            setTasks((prevTasks) => [...prevTasks, {
                id: uuidv4() + currentTime,
                taskName: newTaskName,
                dueDate: newDueDate,
                isDone: false,
                isTimeOver: false,
                createdAt: new Date()
            }]);
            toast.success("🚀 Task successfully added")

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

            <button type='button' className='add-btn' onClick={addNewTask}>ADD  &#x2b;</button>
        </div>
    )
}

export default AddTodo