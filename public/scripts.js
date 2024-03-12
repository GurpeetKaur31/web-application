document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    taskForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const courseId = document.getElementById('courseId').value;
        const taskName = document.getElementById('taskName').value;
        const dueDate = document.getElementById('dueDate').value;
        const additionalDetails = document.getElementById('additionalDetails').value;

        try {
            const response = await fetch(`/courses/${courseId}/tasks/addTask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId,
                    taskName,
                    dueDate,
                    additionalDetails,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            const data = await response.json();
            console.log('Task added:', data);

            // Create a new list item for the added task
            const newTaskItem = document.createElement('li');
            newTaskItem.textContent = `${taskName} - Due: ${dueDate}`;
            taskList.appendChild(newTaskItem);

            // Clear the form fields
            document.getElementById('courseId').value = '';
            document.getElementById('taskName').value = '';
            document.getElementById('dueDate').value = '';
            document.getElementById('additionalDetails').value = '';

        } catch (error) {
            console.error('Error:', error);
            // Handle error: Show an error message to the user
            alert('Error: Failed to add task');
        }
    });
});