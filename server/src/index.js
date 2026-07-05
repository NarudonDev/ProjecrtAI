import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5000;

let nextId = 4;
let tasks = [
  { id: 1, title: "Connect React to the Express API", done: true },
  { id: 2, title: "Add a full-stack feature", done: false },
  { id: 3, title: "Build and serve the frontend", done: false }
];

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "online",
    service: "fullstack-starter-api",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/tasks", (_req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const title = String(req.body?.title || "").trim();

  if (!title) {
    return res.status(400).json({ message: "Task title is required." });
  }

  const task = {
    id: nextId++,
    title,
    done: false
  };

  tasks = [task, ...tasks];
  return res.status(201).json(task);
});

app.patch("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }

  if (typeof req.body?.done === "boolean") {
    task.done = req.body.done;
  }

  if (typeof req.body?.title === "string" && req.body.title.trim()) {
    task.title = req.body.title.trim();
  }

  return res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const beforeCount = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === beforeCount) {
    return res.status(404).json({ message: "Task not found." });
  }

  return res.status(204).end();
});

const clientDist = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientDist));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  return res.sendFile(path.join(clientDist, "index.html"), (err) => {
    if (err) next(err);
  });
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
