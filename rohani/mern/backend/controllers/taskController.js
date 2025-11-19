import asyncHandler from "../middlewares/asyncHandler.js";
import prisma from "../db/prisma.js";

const validateTaskOwnership = async (taskId, userId) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) {
    return { error: "Task not found" };
  }
  if (task.userId !== userId) {
    return { error: "Not authorized to access this task" };
  }
  return { task };
};

const buildTaskData = (body) => {
  const data = {};

  if (body.title !== undefined) {
    data.title = body.title;
  }
  if (body.description !== undefined) {
    data.description = body.description;
  }
  if (body.status !== undefined) {
    data.status = body.status;
  }
  if (body.priority !== undefined) {
    data.priority = body.priority;
  }
  if (body.dueDate !== undefined) {
    data.dueDate = body.dueDate ? new Date(body.dueDate) : null;
  }

  return data;
};

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" },
  });
  res.status(200).json(tasks);
});

const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }

  const newTask = await prisma.task.create({
    data: {
      title,
      description: req.body.description,
      status: req.body.status || "To Do",
      priority: req.body.priority || "Medium",
      dueDate:
        req.body.dueDate === undefined
          ? null
          : req.body.dueDate
          ? new Date(req.body.dueDate)
          : null,
      userId: req.userId,
    },
  });

  res.status(201).json(newTask);
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { error } = await validateTaskOwnership(id, req.userId);
  if (error) {
    const status = error === "Task not found" ? 404 : 403;
    return res.status(status).json({ message: error });
  }

  const payload = buildTaskData(req.body);

  const updatedTask = await prisma.task.update({
    where: { id },
    data: payload,
  });

  res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { error } = await validateTaskOwnership(id, req.userId);
  if (error) {
    const status = error === "Task not found" ? 404 : 403;
    return res.status(status).json({ message: error });
  }

  await prisma.task.delete({ where: { id } });
  res.status(200).json({ message: "Task deleted successfully" });
});

const reorderTasks = asyncHandler(async (req, res) => {
  const { tasks } = req.body;

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return res.status(400).json({ message: "Tasks payload is required" });
  }

  const updatePromises = tasks.map((task) =>
    prisma.task.updateMany({
      where: { id: task.id, userId: req.userId },
      data: { status: task.status },
    })
  );
  await Promise.all(updatePromises);

  res.status(200).json({ message: "Tasks reordered successfully" });
});

export { getTasks, createTask, updateTask, deleteTask, reorderTasks };
