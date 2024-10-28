import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskController from "./controllers/TaskController";
import Loader from "./components/Loader"; // Import the Loader component

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("incomplete");
  const [editDueDate, setEditDueDate] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true); // Set loading to true
    const tasksData = await TaskController.fetchTasks();
    setTasks(tasksData);
    setLoading(false); // Set loading to false after fetching
  };

  const addTask = async (newTask) => {
    setLoading(true); // Set loading to true
    await TaskController.addTask(newTask);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    setLoading(true); // Set loading to true
    await TaskController.deleteTask(id);
    fetchTasks();
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
    setLoading(true); // Set loading to true
    await TaskController.saveEdit(id, updatedTask);
    fetchTasks();
    setEditTaskId(null);
  };

  return (
    <div className="container">
      {loading && <Loader />} {/* Render loader when loading */}
      <div className="mt-5"></div>
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
