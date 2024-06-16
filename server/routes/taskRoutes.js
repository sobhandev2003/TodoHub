const { createTask, markAsCompleted, deleteTask } = require('../controllers/taskControlers');
const { validateAuthToken } = require('../middilware/validateAuthToken');

const Router=require('express').Router()

Router.route("/create").post(validateAuthToken,createTask)
Router.route("/done/:taskId").patch(validateAuthToken,markAsCompleted)
Router.route("/delete/:taskId").delete(validateAuthToken,deleteTask)

module.exports=Router;