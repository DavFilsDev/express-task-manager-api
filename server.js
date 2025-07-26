const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

// Paths to data files
const usersFilePath = path.join(__dirname, "data", "users.json");
const tasksFilePath = path.join(__dirname, "data", "tasks.json");

// Utility functions
const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeJSON = (filePath, data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// --- USER ROUTES ---

// GET /users - get all users
app.get("/users", (req, res) => {
  const data = readJSON(usersFilePath);
  res.json(data.users);
});

// GET /users/:id - get a user by ID
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = readJSON(usersFilePath);
  const user = data.users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// POST /users/restore - reset users file
app.post("/users/restore", (req, res) => {
  const originalUsers = {
    users: [
      { id: 1, username: "alice", email: "alice@example.com" },
      { id: 2, username: "bob", email: "bob@example.com" },
    ],
  };
  writeJSON(usersFilePath, originalUsers);
  res.json({ message: "Users file restored." });
});

// --- TASK ROUTES ---

// GET /tasks - get all tasks
app.get("/tasks", (req, res) => {
  const data = readJSON(tasksFilePath);
  res.json(data.tasks);
});

// GET /tasks/:id - get a task by ID
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = readJSON(tasksFilePath);
  const task = data.tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// GET /users/:id/tasks - get tasks for a specific user
app.get("/users/:id/tasks", (req, res) => {
  const userId = parseInt(req.params.id);
  const data = readJSON(tasksFilePath);
  const tasks = data.tasks.filter((t) => t.userId === userId);
  res.json(tasks);
});

// POST /tasks - create a task
app.post("/tasks", (req, res) => {
  const { title, description, status, userId } = req.body;
  const data = readJSON(tasksFilePath);
  const newId = data.tasks.length ? data.tasks[data.tasks.length - 1].id + 1 : 1;
  const newTask = { id: newId, title, description, status, userId };
  data.tasks.push(newTask);
  writeJSON(tasksFilePath, data);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - update a task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = readJSON(tasksFilePath);
  const taskIndex = data.tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) return res.status(404).json({ message: "Task not found" });

  const { title, description, status, userId } = req.body;
  const task = data.tasks[taskIndex];

  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;
  if (userId) task.userId = userId;

  writeJSON(tasksFilePath, data);
  res.json(task);
});

// DELETE /tasks/:id - delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = readJSON(tasksFilePath);
  const filteredTasks = data.tasks.filter((t) => t.id !== id);
  if (filteredTasks.length === data.tasks.length)
    return res.status(404).json({ message: "Task not found" });

  data.tasks = filteredTasks;
  writeJSON(tasksFilePath, data);
  res.json({ message: `Task with ID ${id} deleted.` });
});

// POST /tasks/restore - reset tasks file
app.post("/tasks/restore", (req, res) => {
  const originalTasks = {
    tasks: [
      {
        id: 1,
        title: "Learn Express",
        description: "Study routing and middleware",
        status: "in-progress",
        userId: 1,
      },
      {
        id: 2,
        title: "Test API with Postman",
        description: "Create collection and test all routes",
        status: "todo",
        userId: 1,
      },
      {
        id: 3,
        title: "Clean up code",
        description: "Remove unused variables",
        status: "done",
        userId: 2,
      },
    ],
  };
  writeJSON(tasksFilePath, originalTasks);
  res.json({ message: "Tasks file restored." });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
