const Task = require("../models/taskModels");
const mongoose = require("mongoose");

const getTasks = async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: "No Such Task" });
  }

  res.status(200).json(task);
};

const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  try {
    const task = await Task.create({ title, description, status, dueDate });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Task" });
  }

  const task = await Task.findByIdAndUpdate(
    id,
    { title, description, status, dueDate },
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ error: "No Such Task" });
  }

  res.status(200).json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Task" });
  }

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return res.status(404).json({ error: "No Such Task" });
  }

  res.status(200).json({ message: "Task Deleted Successfully" });
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
