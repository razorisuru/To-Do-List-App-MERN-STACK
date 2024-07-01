import React, { useState, useEffect } from "react";
import TaskController from "../controllers/TaskController";

const TaskItem = ({
  task,
  editTaskId,
  startEdit,
  cancelEdit,
  saveEdit,
  deleteTask,
}) => {
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("incomplete");
  const [editDueDate, setEditDueDate] = useState("");

  useEffect(() => {
    if (editTaskId === task._id) {
      setEditTitle(task.title);
      setEditDescription(task.description);
      setEditStatus(task.status);
      setEditDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    }
  }, [
    editTaskId,
    task._id,
    task.title,
    task.description,
    task.status,
    task.dueDate,
  ]);

  const handleSave = () => {
    saveEdit(task._id, {
      title: editTitle,
      description: editDescription,
      status: editStatus,
      dueDate: editDueDate,
    });
  };

  const handleCancel = () => {
    cancelEdit();
  };

  const getStatusBadgeVariant = (status) => {
    return status === "completed" ? "bg-success" : "bg-danger";
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center mb-3">
      {editTaskId === task._id ? (
        <div className="w-100">
          <input
            type="text"
            className="form-control mb-2"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />
          <textarea
            className="form-control mb-2"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="date"
            className="form-control mb-2"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
          <select
            className="form-control mb-2"
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
          >
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
          <button className="btn btn-success me-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="w-100">
          <h5 className="mb-0">{task.title}</h5>
          <p className="mb-1">{task.description}</p>
          <p className="mb-1">
            Due Date:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </p>
          <span className={`badge ${getStatusBadgeVariant(task.status)} mb-1`}>
            {task.status}
          </span>
        </div>
      )}
      <div className="ms-auto">
        {editTaskId !== task._id && (
          <button
            className="btn btn-warning mb-2"
            onClick={() => startEdit(task)}
          >
            Edit
          </button>
        )}
        {editTaskId !== task._id && (
          <button
            className="btn btn-danger"
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
