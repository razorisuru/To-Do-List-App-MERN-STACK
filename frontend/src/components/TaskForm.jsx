import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addTask({ title, description, dueDate });
      setTitle("");
      setDescription("");
      setDueDate("");
      setErrors({});
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors({ ...errors, title: "" });
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (errors.description) {
      setErrors({ ...errors, description: "" });
    }
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
    if (errors.dueDate) {
      setErrors({ ...errors, dueDate: "" });
    }
  };

  return (
    <div className="form-container mb-4 p-4 border rounded shadow">
      <h3 className="text-center mb-4">Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="form-group mb-4">
          <input
            type="date"
            className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
            value={dueDate}
            onChange={handleDueDateChange}
          />
          {errors.dueDate && (
            <div className="invalid-feedback">{errors.dueDate}</div>
          )}
        </div>

        <button className="btn btn-primary btn-block">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
