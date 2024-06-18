const { createTask, markAsCompleted, deleteTask, getAllTask, getTodayTask, getPendingTask, getCompletedTask } = require('../controllers/taskControlers');
const { validateAuthToken } = require('../middilware/validateAuthToken');

const Router=require('express').Router()
Router.route("/").get(validateAuthToken,getAllTask)
Router.route("/today").get(validateAuthToken,getTodayTask)
Router.route("/pending").get(validateAuthToken,getPendingTask)
Router.route("/completed").get(validateAuthToken,getCompletedTask)
Router.route("/create").post(validateAuthToken,createTask)
Router.route("/done/:taskId").patch(validateAuthToken,markAsCompleted)
Router.route("/delete/:taskId").delete(validateAuthToken,deleteTask)

module.exports=Router;