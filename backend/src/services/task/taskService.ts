import { dbRequest } from '../../database';
import { TaskCreateParams, TaskEntity, TaskUpdateParams } from './taskTypes';

/**
 * @summary Get all tasks for a user
 */
export async function taskList({ idUser }: { idUser: number }): Promise<TaskEntity[]> {
  try {
    const tasks = await dbRequest(
      'SELECT * FROM tasks WHERE idUser = @idUser AND deleted = 0 ORDER BY priority DESC, dueDate ASC',
      { idUser }
    );
    
    return tasks;
  } catch (error) {
    console.error('Error listing tasks:', error);
    throw new Error('Failed to list tasks');
  }
}

/**
 * @summary Get a specific task by ID
 */
export async function taskGet({ idUser, idTask }: { idUser: number, idTask: number }): Promise<TaskEntity | null> {
  try {
    const tasks = await dbRequest(
      'SELECT * FROM tasks WHERE idTask = @idTask AND idUser = @idUser AND deleted = 0',
      { idTask, idUser }
    );
    
    return tasks.length > 0 ? tasks[0] : null;
  } catch (error) {
    console.error('Error getting task:', error);
    throw new Error('Failed to get task');
  }
}

/**
 * @summary Create a new task
 */
export async function taskCreate(params: TaskCreateParams): Promise<TaskEntity> {
  try {
    const { idUser, title, description, dueDate, priority } = params;
    
    const result = await dbRequest(
      `INSERT INTO tasks (idUser, title, description, dueDate, priority, completed, dateCreated, deleted) \n       VALUES (@idUser, @title, @description, @dueDate, @priority, 0, GETUTCDATE(), 0);\n       SELECT SCOPE_IDENTITY() AS idTask;`,
      { idUser, title, description, dueDate, priority }
    );
    
    const idTask = result[0].idTask;
    
    return {
      idTask,
      idUser,
      title,
      description,
      dueDate,
      priority,
      completed: false,
      dateCreated: new Date(),
      deleted: false
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
}

/**
 * @summary Update an existing task
 */
export async function taskUpdate(params: TaskUpdateParams): Promise<TaskEntity | null> {
  try {
    const { idUser, idTask, title, description, dueDate, priority, completed } = params;
    
    // Check if task exists and belongs to user
    const existingTask = await taskGet({ idUser, idTask });
    
    if (!existingTask) {
      return null;
    }
    
    // Update task
    await dbRequest(
      `UPDATE tasks \n       SET title = @title, \n           description = @description, \n           dueDate = @dueDate, \n           priority = @priority, \n           completed = @completed, \n           dateModified = GETUTCDATE() \n       WHERE idTask = @idTask AND idUser = @idUser`,
      { idTask, idUser, title, description, dueDate, priority, completed }
    );
    
    // Return updated task
    return {
      ...existingTask,
      title,
      description,
      dueDate,
      priority,
      completed: completed || false
    };
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');
  }
}

/**
 * @summary Delete a task (soft delete)
 */
export async function taskDelete({ idUser, idTask }: { idUser: number, idTask: number }): Promise<boolean> {
  try {
    // Check if task exists and belongs to user
    const existingTask = await taskGet({ idUser, idTask });
    
    if (!existingTask) {
      return false;
    }
    
    // Soft delete task
    await dbRequest(
      'UPDATE tasks SET deleted = 1, dateModified = GETUTCDATE() WHERE idTask = @idTask AND idUser = @idUser',
      { idTask, idUser }
    );
    
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
}
