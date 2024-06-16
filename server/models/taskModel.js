const mongoose = require('mongoose');
const cron = require('node-cron');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false
    },
    isTimeOver: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
})
const Task = mongoose.model('Task', taskSchema);
const taskListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: [true, "user id must be unique"]
    },
    task: {
        type: [taskSchema]
    }
}, {
    timestamps: true
})

const TaskList = mongoose.model("TaskList", taskListSchema)
//NOTE - Parse the date for compare
const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Months are 0-based in JavaScript Date
};

//NOTE -  Function to update the isTimeOver field
async function updateIsTimeOver() {
    const now = parseDate(new Date().toLocaleDateString());
    try {
        const taskLists = await TaskList.find();
        taskLists.forEach(async (taskList) => {
            taskList.task.forEach(async (task) => {
                if (parseDate(task.dueDate) < now) {
                    task.isTimeOver = true;
                }
            })
            await taskList.save();

        })
    } catch (error) {
        console.error('Error updating isTimeOver status:', error);
    }
}

// Schedule the function to run every minute
cron.schedule('* * * * *', updateIsTimeOver);


module.exports = { Task, TaskList }
