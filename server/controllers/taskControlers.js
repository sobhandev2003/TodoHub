
const asyncHandler = require("express-async-handler");
const { Task, TaskList, parseDate } = require("../models/taskModel");
const { User } = require("../models/userModel");
const { customDateValidator } = require("../utils/validator");
//NOTE - Create new task
const createTask = asyncHandler(async (req, res) => {
    let { taskName, dueDate } = req.body
    if (!taskName || !dueDate) {
        res.status(400)
        throw new Error("Invalid request");
    }
    if (isNaN(new Date(dueDate).getTime())) {
        res.status(400)
        throw new Error("Invalid due date");
    }
    dueDate = new Date(dueDate).toLocaleDateString();

    const user = await User.findById(req.user.id);
    if (!user || !user.isVerified) {
        res.status(404)
        throw new Error("User not found");
    }
    let exitTaskList = await TaskList.findOne({ userId: user._id });
    if (!exitTaskList) {
        exitTaskList = await TaskList.create({ userId: user._id });
    }
    if (customDateValidator(dueDate)) {
        const newTask = new Task({
            taskName,
            dueDate
        })
        exitTaskList.task.push(newTask);

        await exitTaskList.save()
        res.status(201).json({ success: true, message: "Task successfully added." })
    }
    else {
        res.status(400)
        throw new Error("Invalid due date");
    }
})
//NOTE - Mark as a completed task
const markAsCompleted = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        res.status(400)
        throw new Error("Invalid request");
    }
    const taskList = await TaskList.findOne({ userId: req.user.id });
    if (!taskList) {
        res.status(404)
        throw new Error("Task not found");
    }
    const task = taskList.task.id(taskId)
    if (!task) {
        res.status(404)
        throw new Error("Task not found");
    }
    if (task.isDone) {
        res.status(400)
        throw new Error("Task already completed");
    }
    if (task.isTimeOver) {
        res.status(400)
        throw new Error("Task completion time is over");
    }
    task.isDone = true;
    await taskList.save();
    res.status(200).json({ success: true, message: "Task marked as completed.", task })
})

//NOTE - Delete a task
const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
        res.status(400)
        throw new Error("Invalid request")
    }
    const taskList = await TaskList.findOne({ userId: req.user.id });
    if (!taskList) {
        res.status(404)
        throw new Error("Task not found");
    }
    const task = taskList.task.id(taskId);
    if (!task) {
        res.status(404)
        throw new Error("Task not found");
    }
    taskList.task = taskList.task.filter(task => task._id.toString() !== taskId);
    await taskList.save();
    res.status(200).json({ success: true, message: "Successfully removed" })

})
//NOTE - Gate all task login user
const getAllTask = asyncHandler(async (req, res) => {

    const taskList = await TaskList.findOne({ userId: req.user.id });
    if (!taskList) {
        res.status(404)
        throw new Error("No task found");
    }
    res.status(200)
        .json({
            success: true,
            task: taskList.task
        })
})
//NOTE -  Gate today task
const getTodayTask = asyncHandler(async (req, res) => {
    const taskList = await TaskList.findOne({ userId: req.user.id });
    if (!taskList) {
        res.status(404)
        throw new Error("No task found");
    }
    const now = parseDate(new Date().toLocaleDateString());
    //STUB -  Function to check if two dates are the same (year, month, day)
    const areDatesSame = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    };

    const todayTask = taskList.task.filter((t) => {
        const dueDate = parseDate(t.dueDate);
        return areDatesSame(dueDate, now);
    })
    res.status(200)
        .json({
            success: true,
            task: todayTask
        })
})
//NOTE - Gate pending task
const getPendingTask = asyncHandler(async (req, res) => {
    const taskList = await TaskList.findOne({ userId: req.user.id });
    if (!taskList) {
        res.status(404)
        throw new Error("No task found");
    }
    const pendingTask = taskList.task.filter((t) => !t.isDone);
   
    res.status(200)
        .json({
            success: true,
            task: pendingTask
        })
})
//NOTE - Gate completed task
const getCompletedTask = asyncHandler(async (req, res) => {
    const taskList = await TaskList.findOne({ userId: req.user.id });
    if (!taskList) {
        res.status(404)
        throw new Error("No task found");
    }
    const completedTask = taskList.task.filter((t) => t.isDone);
    res.status(200)
        .json({
            success: true,
            task: completedTask
        })

})

module.exports = {
    createTask,
    markAsCompleted,
    deleteTask,
    getAllTask,
    getTodayTask,
    getPendingTask,
    getCompletedTask
}