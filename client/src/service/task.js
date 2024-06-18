import axios from "axios";
import { toast } from "react-toastify";

const taskUrl = `${process.env.REACT_APP_BASEURL}/task`
//Get all task
export const getAllTask = async (setStoredTask,setFilterState) => {
    try {
        const response = await axios.get(`${taskUrl}`, {
            withCredentials: true
        });
        // console.log(response.data);
        setStoredTask(response?.data?.task || []);
     response?.data?.success &&setFilterState("all")

    } catch (error) {
        toast.error(error?.response?.data.message || error.message);
    }
}
//NOTE - Get Today task
export const getTodayTask = async (setStoredTask,setFilterState) => {
    try {
        const response = await axios.get(`${taskUrl}/today`, {
            withCredentials: true
        })
        // console.log(response.data);
        setStoredTask(response?.data?.task || []);
        response?.data?.success && setFilterState("today")


    } catch (error) {
        toast.error(error.response?.data.message || error.message);
    }
}
//NOTE - Get pending task
export const getPendingTask = async (setStoredTask,setFilterState) => {
    try {
        const response = await axios.get(`${taskUrl}/pending`, {
            withCredentials: true
        })
        setStoredTask(response?.data?.task);
        response?.data?.success && setFilterState("pending")
    } catch (error) {
        toast.error(error.response?.data.message || error.message);
    }
}
//NOTE - Get completed task
export const getCompletedTask = async (setStoredTask,setFilterState) => {
    try {
        const response = await axios.get(`${taskUrl}/completed`, {
            withCredentials: true
        })
        setStoredTask(response?.data?.task);
        response?.data?.success && setFilterState("completed")
        
    } catch (error) {
        toast.error(error.response?.data.message || error.message);
    }
}
//NOTE - Add new task
export const addNewTask = async (taskData, setStoredTask,setFilterState) => {
    try {
        console.log(taskData);
        const response = axios.post(`${taskUrl}/create`, taskData, {
            withCredentials: true
        })
        toast.promise(response, {
            pending: "Adding...",
            success: "Task added successfully",
            error: "Error adding task"
        })
        // console.log((await response).data);
        response.then(() => {
            getAllTask(setStoredTask,setFilterState)
        })

    } catch (error) {
        toast.error(error.response.data.message || error.message);
    }
}

//NOTE - Update task mark as a completed task
export const updateTaskMarkAsComplete = async (taskId, setStoredTask,setFilterState,filterState) => {
    try {
        const response = axios.patch(`${taskUrl}/done/${taskId}`, {}, {
            withCredentials: true
        });
        toast.promise(response, {
            pending: "Updating...",
            success: "Task marked as completed",
            error: "Error marking task as completed"
        })
        response.then(() => {
            filterState==="all"&& getAllTask(setStoredTask,setFilterState)
            filterState==="today"&& getTodayTask(setStoredTask,setFilterState)

            filterState==="pending" && getPendingTask(setStoredTask,setFilterState)
            filterState==="completed" && getCompletedTask(setStoredTask,setFilterState)
        })

    } catch (error) {
        toast.error(error.response?.data.message || error.message);
    }
}

//NOTE - Delete Task
export const deleteTask = async (taskId, setStoredTask,setFilterState,filterState) => {
    try {
        // console.log(taskId);
        const response = axios.delete(`${taskUrl}/delete/${taskId}`, {
            withCredentials: true
        })
        toast.promise(response, {
            pending: "Deleting...",
            success: "Task deleted successfully",
            error: "Error deleting task"
        })
        response.then(() => {
            filterState==="all"&& getAllTask(setStoredTask,setFilterState)
            filterState==="today"&& getTodayTask(setStoredTask,setFilterState)

            filterState==="pending" && getPendingTask(setStoredTask,setFilterState)
            filterState==="completed" && getCompletedTask(setStoredTask,setFilterState)

        })


    } catch (error) {
        toast.error(error.response?.data.message || error.message);
    }
}
