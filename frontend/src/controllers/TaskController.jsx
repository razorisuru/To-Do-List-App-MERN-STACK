import axios from "axios";

const TaskController = {
  fetchTasks: async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks");
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  },

  addTask: async (newTask) => {
    try {
      await axios.post("http://localhost:4000/api/tasks", newTask);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },

  saveEdit: async (id, updatedTask) => {
    try {
      await axios.patch(`http://localhost:4000/api/tasks/${id}`, updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  },
};

export default TaskController;
