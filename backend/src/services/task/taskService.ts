import { dbRequest } from '../../database';
import { TaskCreateParams, TaskEntity, TaskStatus, TaskUpdateParams } from './taskTypes';
import { sanitizeInput } from '../../utils/validation';
import { logger } from '../../utils/logger';

/**
 * @summary Get all tasks for a user
 */
export async function taskList({ idUser }: { idUser: number }): Promise<TaskEntity[]> {
  try {
    const tasks = await dbRequest(
      'SELECT * FROM tasks WHERE idUser = @idUser AND deleted = 0 ORDER BY dateCreated DESC',
      { idUser }
    );
    
    return tasks;
  } catch (error) {
    logger.error('Error listing tasks:', { error, idUser });
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
    logger.error('Error getting task:', { error, idUser, idTask });
    throw new Error('Failed to get task');
  }
}

/**
 * @summary Create a new task
 */
export async function taskCreate(params: TaskCreateParams): Promise<TaskEntity> {
  const startTime = Date.now();
  try {
    const { idUser, title, description = '' } = params;
    
    // Sanitize inputs to prevent XSS
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = sanitizeInput(description);
    
    // Set default status to 'Pendente'
    const status = TaskStatus.Pendente;
    
    const result = await dbRequest(
      `INSERT INTO tasks (idUser, title, description, status, dateCreated, deleted) \n       VALUES (@idUser, @title, @description, @status, GETUTCDATE(), 0);\n       SELECT SCOPE_IDENTITY() AS idTask;`,
      { idUser, title: sanitizedTitle, description: sanitizedDescription, status }
    );
    
    const idTask = result[0].idTask;
    
    const createdTask: TaskEntity = {
      idTask,
      idUser,
      title: sanitizedTitle,
      description: sanitizedDescription,
      status,
      dateCreated: new Date(),
      deleted: false
    };

    const duration = Date.now() - startTime;
    logger.info('Task created successfully', { idTask, idUser, duration });
    
    return createdTask;
  } catch (error) {
    logger.error('Error creating task:', { error, params });
    throw new Error('Failed to create task');
  }
}

/**
 * @summary Update an existing task
 */
export async function taskUpdate(params: TaskUpdateParams): Promise<TaskEntity | null> {
  try {
    const { idUser, idTask, title, description, status } = params;
    
    // Check if task exists and belongs to user
    const existingTask = await taskGet({ idUser, idTask });
    
    if (!existingTask) {
      return null;
    }
    
    // Sanitize inputs
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = sanitizeInput(description || '');
    
    // Update task
    await dbRequest(
      `UPDATE tasks \n       SET title = @title, \n           description = @description, \n           status = @status, \n           dateModified = GETUTCDATE() \n       WHERE idTask = @idTask AND idUser = @idUser`,
      { 
        idTask, 
        idUser, 
        title: sanitizedTitle, 
        description: sanitizedDescription, 
        status: status || existingTask.status 
      }
    );
    
    // Return updated task
    return {
      ...existingTask,
      title: sanitizedTitle,
      description: sanitizedDescription,
      status: status || existingTask.status,
      dateModified: new Date()
    };
  } catch (error) {
    logger.error('Error updating task:', { error, params });
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
    logger.error('Error deleting task:', { error, idUser, idTask });
    throw new Error('Failed to delete task');
  }
}
