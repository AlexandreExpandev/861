import { Task, TaskCreateInput, TaskUpdateInput } from './taskTypes';
import { db } from '../../instances/database';

/**
 * @summary Create a new task
 * @param taskData Task creation data
 * @returns Created task
 */
export async function taskCreate(taskData: TaskCreateInput): Promise<Task> {
  const { userId, title, description, status } = taskData;

  const task = await db.task.create({
    data: {
      userId,
      title,
      description: description || '',
      status,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return task;
}

/**
 * @summary Get a task by ID
 * @param userId User ID
 * @param taskId Task ID
 * @returns Task or null if not found
 */
export async function taskGet(userId: number, taskId: number): Promise<Task | null> {
  const task = await db.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  return task;
}

/**
 * @summary List all tasks for a user
 * @param userId User ID
 * @returns Array of tasks
 */
export async function taskList(userId: number): Promise<Task[]> {
  const tasks = await db.task.findMany({
    where: {
      userId,
    },
    orderBy: [
      { completed: 'asc' },
      { priority: 'desc' },
      { dueDate: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  return tasks;
}

/**
 * @summary Update a task
 * @param taskData Task update data
 * @returns Updated task or null if not found
 */
export async function taskUpdate(taskData: TaskUpdateInput): Promise<Task | null> {
  const { id, userId, title, description, dueDate, priority, completed, status } = taskData;

  // Check if task exists and belongs to user
  const existingTask = await db.task.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existingTask) {
    return null;
  }

  const updatedTask = await db.task.update({
    where: { id },
    data: {
      title,
      description: description || '',
      dueDate,
      priority,
      status: status || existingTask.status,
      completed: completed ?? existingTask.completed,
      updatedAt: new Date(),
    },
  });

  return updatedTask;
}

/**
 * @summary Delete a task
 * @param userId User ID
 * @param taskId Task ID
 * @returns True if deleted, false if not found
 */
export async function taskDelete(userId: number, taskId: number): Promise<boolean> {
  // Check if task exists and belongs to user
  const existingTask = await db.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    return false;
  }

  await db.task.delete({
    where: { id: taskId },
  });

  return true;
}
