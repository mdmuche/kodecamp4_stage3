const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let tasks = [];

// A get endpoint to get a list of all tasks.
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// A post endpoint to add a new task.
app.post("/tasks", (req, res) => {
  const { taskTitle, taskBody, taskStatus } = req.body;

  const newTasks = {
    id: uuidv4(),
    taskTitle,
    taskBody,
    taskStatus,
  };

  tasks.push(newTasks);

  res.status(201).json(newTasks);
});

// A get endpoint to get a task by it's ID
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const task = tasks.find((t) => t.id === id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).send("task not found");
  }
});

// An put endpoint to change the title and body of a task,
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { taskTitle, taskBody } = req.body;

  const task = tasks.find((t) => t.id === id);

  if (task) {
    task.taskTitle = taskTitle;
    task.taskBody = taskBody;
    res.json(task);
  } else {
    res.status(404).json("task not found");
  }
});

// A patch endpoint to change the status of a task
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { taskStatus } = req.body;

  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.taskStatus = taskStatus;
    res.json(task);
  } else {
    res.status(404).json("task not found");
  }
});

// A delete endpoint to remove a task from the array of tasks.
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const index = tasks.findIndex((t) => t.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).json("task deleted successfully!");
  } else {
    res.status(404).json("couldn't find task to delete");
  }
});

app.listen(port, (req, res) => {
  console.log(`listening for request at port ${port}`);
});
