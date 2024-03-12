const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Add a new task
router.post('/:courseId/tasks/addTask', async (req, res) => {
    const { courseId, taskName, dueDate, additionalDetails } = req.body;

    try {
        const newTask = new Task({
            courseId,
            taskName,
            dueDate,
            additionalDetails
        });

        await newTask.save();
        res.status(201).json(newTask); // Respond with the newly created task
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get tasks for a specific course ID
router.get('/:courseId/tasks', async (req, res) => {
    const { courseId } = req.params;

    try {
        const tasks = await Task.find({ courseId });
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for the course ID' });
        }
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;