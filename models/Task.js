const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    courseId: String,
    taskName: String,
    dueDate: Date,
    additionalDetails: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;