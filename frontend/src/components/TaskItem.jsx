import React, { useState, useEffect } from "react";

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
  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal state

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
    const newErrors = {};

    if (!editTitle) {
      newErrors.title = "Title is required.";
    }
    if (!editDescription) {
      newErrors.description = "Description is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      saveEdit(task._id, {
        title: editTitle,
        description: editDescription,
        status: editStatus,
        dueDate: editDueDate,
      });
      setErrors({});
    }
  };

  const handleCancel = () => {
    cancelEdit();
    setErrors({});
  };

  const handleDelete = () => {
    deleteTask(task._id);
    setShowDeleteModal(false); // Close modal after delete
  };

  const getStatusBadgeVariant = (status) => {
    return status === "completed" ? "bg-success" : "bg-danger";
  };

  return (
    <>
      {/* Task item */}
      <li className="list-group-item d-flex justify-content-between align-items-center mb-3 p-4 shadow-sm rounded border">
        {editTaskId === task._id ? (
          <div className="w-100">
            <input
              type="text"
              className={`form-control mb-2 ${
                errors.title ? "is-invalid" : ""
              }`}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
              placeholder="Task Title"
            />
            {errors.title && (
              <div className="invalid-feedback mb-2">{errors.title}</div>
            )}

            <textarea
              className={`form-control mb-2 ${
                errors.description ? "is-invalid" : ""
              }`}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              required
              placeholder="Task Description"
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback mb-2">{errors.description}</div>
            )}

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
            <h5 className="mb-2">{task.title}</h5>
            <p className="mb-2">{task.description}</p>
            <p className="mb-2">
              Due Date:{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No due date"}
            </p>
            <span
              className={`badge ${getStatusBadgeVariant(task.status)} mb-2`}
            >
              {task.status}
            </span>
          </div>
        )}

        <div className="ms-auto">
          {editTaskId !== task._id && (
            <button
              className="btn btn-warning mb-2 me-2"
              onClick={() => startEdit(task)}
            >
              Edit
            </button>
          )}
          {editTaskId !== task._id && (
            <button
              className="btn btn-danger"
              onClick={() => setShowDeleteModal(true)} // Show modal
            >
              Delete
            </button>
          )}
        </div>
      </li>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)} // Close modal
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this task?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)} // Close modal
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete} // Confirm delete
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
