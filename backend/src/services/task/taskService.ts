import { dbRequest } from '../../utils/database';
import { Task } from './taskTypes';

/**
 * @summary
 * Get all tasks for a specific user
 */
export async function taskList({ userId }: { userId: number }): Promise<Task[]> {
  try {
    const tasks = await dbRequest(
      'SELECT id, title, description, dueDate, priority, completed, createdAt, updatedAt FROM tasks WHERE userId = @userId AND deleted = 0 ORDER BY dueDate ASC',
      { userId }
    );

    return tasks;
  } catch (error) {
    console.error('Error listing tasks:', error);
    throw error;
  }
}

/**
 * @summary
 * Get a specific task by ID
 */
export async function taskGet({
  userId,
  taskId,
}: {
  userId: number;
  taskId: number;
}): Promise<Task | null> {
  try {
    const tasks = await dbRequest(
      'SELECT id, title, description, dueDate, priority, completed, createdAt, updatedAt FROM tasks WHERE id = @taskId AND userId = @userId AND deleted = 0',
      { userId, taskId }
    );

    return tasks.length > 0 ? tasks[0] : null;
  } catch (error) {
    console.error('Error getting task:', error);
    throw error;
  }
}

/**
 * @summary
 * Create a new task
 */
export async function taskCreate({
  userId,
  title,
  description,
  dueDate,
  priority,
}: {
  userId: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
}): Promise<Task> {
  try {
    const result = await dbRequest(
      `INSERT INTO tasks (userId, title, description, dueDate, priority) 
       VALUES (@userId, @title, @description, @dueDate, @priority);
       SELECT SCOPE_IDENTITY() AS id;`,
      {
        userId,
        title,
        description: description || null,
        dueDate: dueDate || null,
        priority: priority || 'medium',
      }
    );

    const taskId = result[0].id;

    return {
      id: taskId,
      userId,
      title,
      description: description || null,
      dueDate: dueDate || null,
      priority: priority || 'medium',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

/**
 * @summary
 * Update an existing task
 */
export async function taskUpdate({
  userId,
  taskId,
  title,
  description,
  dueDate,
  priority,
  completed,
}: {
  userId: number;
  taskId: number;
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  completed?: boolean;
}): Promise<Task | null> {
  try {
    // First check if the task exists and belongs to the user
    const existingTask = await taskGet({ userId, taskId });

    if (!existingTask) {
      return null;
    }

    // Build update query dynamically based on provided fields
    let updateFields = [];
    const params: any = { userId, taskId };

    if (title !== undefined) {
      updateFields.push('title = @title');
      params.title = title;
    }

    if (description !== undefined) {
      updateFields.push('description = @description');
      params.description = description;
    }

    if (dueDate !== undefined) {
      updateFields.push('dueDate = @dueDate');
      params.dueDate = dueDate;
    }

    if (priority !== undefined) {
      updateFields.push('priority = @priority');
      params.priority = priority;
    }

    if (completed !== undefined) {
      updateFields.push('completed = @completed');
      params.completed = completed;
    }

    updateFields.push('updatedAt = GETUTCDATE()');

    if (updateFields.length === 0) {
      return existingTask; // Nothing to update
    }

    await dbRequest(
      `UPDATE tasks SET ${updateFields.join(', ')} 
       WHERE id = @taskId AND userId = @userId AND deleted = 0`,
      params
    );

    // Get the updated task
    return await taskGet({ userId, taskId });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

/**
 * @summary
 * Delete a task (soft delete)
 */
export async function taskDelete({
  userId,
  taskId,
}: {
  userId: number;
  taskId: number;
}): Promise<boolean> {
  try {
    // First check if the task exists and belongs to the user
    const existingTask = await taskGet({ userId, taskId });

    if (!existingTask) {
      return false;
    }

    await dbRequest(
      'UPDATE tasks SET deleted = 1, updatedAt = GETUTCDATE() WHERE id = @taskId AND userId = @userId',
      { userId, taskId }
    );

    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}
