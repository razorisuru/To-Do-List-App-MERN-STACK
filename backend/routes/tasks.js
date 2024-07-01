const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);

router.get("/:id", getTask);

router.post("/", createTask);

router.delete("/:id", deleteTask);

router.patch("/:id", updateTask);

module.exports = router;
