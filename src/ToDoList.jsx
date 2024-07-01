import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleEditingInputChange(event) {
    setEditingTaskText(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function startEditingTask(index, task) {
    setEditingTaskIndex(index);
    setEditingTaskText(task);
  }

  function saveEditedTask() {
    if (editingTaskText.trim() !== "") {
      const updatedTasks = tasks.map((task, index) =>
        index === editingTaskIndex ? editingTaskText : task
      );
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
      setEditingTaskText("");
    }
  }

  function cancelEditing() {
    setEditingTaskIndex(null);
    setEditingTaskText("");
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol className=" oll">
        {tasks.map((task, index) => (
          <li key={index}>
            {editingTaskIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editingTaskText}
                  onChange={handleEditingInputChange}
                />
                <button className="savebtn" onClick={saveEditedTask}>Save</button>
                <button className="cancelbtn" onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <div>
                <span className="text">{task}</span>
                <button
                  className="edit-button"
                  onClick={() => startEditingTask(index, task)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskUp(index)}
                >
                  👆
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskDown(index)}
                >
                  👇
                </button>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
