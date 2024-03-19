import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, { id: Date.now(), content: newTask, editMode: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, editMode: true } : task))
    );
    setEditTaskId(taskId);
    setShowEditModal(true); 
  };

  const handleSaveEdit = (editedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
    setShowEditModal(false);
    setEditTaskId(null);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditTaskId(null);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Enter a task"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            {task.editMode ? (
              <input
                type="text"
                className="form-control"
                value={task.content}
                onChange={(event) =>
                  handleSaveEdit({ ...task, content: event.target.value })
                }
              />
            ) : (
              <span>{task.content}</span>
            )}
            <div className="btn-group">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handleEditTask(task.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={handleCancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={tasks.find((t) => t.id === editTaskId)?.content || ''}
            onChange={(event) => setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === editTaskId ? { ...task, content: event.target.value } : task))
              )}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSaveEdit(tasks.find((t) => t.id === editTaskId))}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TaskManager;
