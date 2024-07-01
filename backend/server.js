require("dotenv").config();

const express = require("express");
const taskRoutes = require("./routes/tasks");
const { default: mongoose } = require("mongoose");
const cors = require('cors'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/tasks", taskRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & Ahan inne", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;
