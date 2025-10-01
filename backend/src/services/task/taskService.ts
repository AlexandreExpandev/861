import { db } from '../../instances/database';
import { Task, TaskCreate, TaskUpdate } from './taskTypes';
import { NotFoundError } from '../../utils/errors';

/**
 * @summary
 * Get all tasks for a specific user
 *
 * @param userId User ID
 * @returns Array of tasks
 */
export async function taskList(userId: number): Promise<Task[]> {
  try {
    // Get all tasks for the user
    const tasks = await db.task.findMany({
      where: {
        userId,
        deleted: false,
      },
      orderBy: [{ priority: 'desc' }, { dueDate: 'asc' }],
    });

    return tasks;
  } catch (error) {
    throw error;
  }
}

/**
 * @summary
 * Get a specific task by ID
 *
 * @param userId User ID
 * @param taskId Task ID
 * @returns Task or null if not found
 */
export async function taskGet(userId: number, taskId: number): Promise<Task | null> {
  try {
    // Get task by ID for the specific user
    const task = await db.task.findFirst({
      where: {
        id: taskId,
        userId,
        deleted: false,
      },
    });

    return task;
  } catch (error) {
    throw error;
  }
}

/**
 * @summary
 * Create a new task
 *
 * @param userId User ID
 * @param taskData Task data
 * @returns Created task
 */
export async function taskCreate(userId: number, taskData: TaskCreate): Promise<Task> {
  try {
    // Performance monitoring start time
    const startTime = Date.now();

    // Create new task with default status as 'Pendente'
    const task = await db.task.create({
      data: {
        userId,
        title: taskData.title,
        description: taskData.description || '',
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
        priority: taskData.priority || 2,
        completed: false, // Default status is 'Pendente' (not completed)
        deleted: false,
      },
    });

    // Performance monitoring end time
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`Task creation completed in ${duration}ms`);

    return task;
  } catch (error) {
    throw error;
  }
}

/**
 * @summary
 * Update an existing task
 *
 * @param userId User ID
 * @param taskId Task ID
 * @param taskData Task data
 * @returns Updated task or null if not found
 */
export async function taskUpdate(
  userId: number,
  taskId: number,
  taskData: TaskUpdate
): Promise<Task | null> {
  try {
    // Check if task exists and belongs to user
    const existingTask = await db.task.findFirst({
      where: {
        id: taskId,
        userId,
        deleted: false,
      },
    });

    if (!existingTask) {
      return null;
    }

    // Update task
    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: {
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
        priority: taskData.priority,
        completed: taskData.completed !== undefined ? taskData.completed : existingTask.completed,
      },
    });

    return updatedTask;
  } catch (error) {
    throw error;
  }
}

/**
 * @summary
 * Delete a task (soft delete)
 *
 * @param userId User ID
 * @param taskId Task ID
 * @returns True if deleted, false if not found
 */
export async function taskDelete(userId: number, taskId: number): Promise<boolean> {
  try {
    // Check if task exists and belongs to user
    const existingTask = await db.task.findFirst({
      where: {
        id: taskId,
        userId,
        deleted: false,
      },
    });

    if (!existingTask) {
      return false;
    }

    // Soft delete task
    await db.task.update({
      where: { id: taskId },
      data: { deleted: true },
    });

    return true;
  } catch (error) {
    throw error;
  }
}
