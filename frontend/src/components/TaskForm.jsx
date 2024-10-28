import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation to check if fields are empty
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
    } else {
      addTask({ title, description, dueDate });
      setTitle("");
      setDescription("");
      setDueDate("");
      setErrors({}); // Clear errors after successful submission
    }
  };

  // Clear the specific error when the user starts typing
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
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        {errors.title && <small className="text-danger">{errors.title}</small>}

        <textarea
          className={`form-control my-2 ${
            errors.description ? "is-invalid" : ""
          }`}
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        {errors.description && (
          <small className="text-danger">{errors.description}</small>
        )}

        <input
          type="date"
          className={`form-control my-2 ${errors.dueDate ? "is-invalid" : ""}`}
          value={dueDate}
          onChange={handleDueDateChange}
        />
        {errors.dueDate && (
          <small className="text-danger">{errors.dueDate}</small>
        )}

        <button className="btn btn-primary" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
