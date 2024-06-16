
const asyncHandler = require("express-async-handler");
const { Task, TaskList } = require("../models/taskModel");
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
    console.log(dueDate);

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
    // console.log(req.user.id);
    const taskList = await TaskList.findOne({ userId: req.user.id });
    if (!taskList) {
        res.status(404)
        throw new Error("Task not found");
    }
    // console.log(taskList);
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
    res.status(200).json({ success: true, message: "Task marked as completed." })
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
module.exports = {
    createTask,
    markAsCompleted,
    deleteTask
}