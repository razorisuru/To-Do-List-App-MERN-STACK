import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskController from "./controllers/TaskController";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("incomplete");
  const [editDueDate, setEditDueDate] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasksData = await TaskController.fetchTasks();
    setTasks(tasksData);
  };

  const addTask = async (newTask) => {
    await TaskController.addTask(newTask);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await TaskController.deleteTask(id);
      fetchTasks();
    }
  };

  const startEdit = (task) => {
    setEditTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
    setEditDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
  };

  const cancelEdit = () => {
    setEditTaskId(null);
  };

  const saveEdit = async (id, updatedTask) => {
    await TaskController.saveEdit(id, updatedTask);
    fetchTasks();
    setEditTaskId(null);
  };

  return (
    <div className="container">
      <h1 className="text-center text-light text-bg-info rounded-3 my-4">To-Do List</h1>
      <TaskForm addTask={addTask} />
      <ul className="list-group">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            editTaskId={editTaskId}
            editTitle={editTitle}
            editDescription={editDescription}
            editStatus={editStatus}
            editDueDate={editDueDate}
            startEdit={startEdit}
            cancelEdit={cancelEdit}
            saveEdit={saveEdit}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
