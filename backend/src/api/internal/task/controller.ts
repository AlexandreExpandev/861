import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { taskCreate, taskGet, taskList, taskUpdate, taskDelete } from '../../../services/task';
import { successResponse } from '../../../utils/responses';
import { NotFoundError } from '../../../utils/errors';

/**
 * @summary
 * List all tasks for the authenticated user
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Get user ID from authenticated user
    const userId = req.user.id;

    // Get tasks from service
    const tasks = await taskList(userId);

    // Return success response
    res.json(successResponse(tasks));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Get a specific task by ID
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Get user ID from authenticated user
    const userId = req.user.id;

    // Get task ID from request parameters
    const taskId = parseInt(req.params.id);

    // Get task from service
    const task = await taskGet(userId, taskId);

    // Check if task exists
    if (!task) {
      throw new NotFoundError('Task not found');
    }

    // Return success response
    res.json(successResponse(task));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Create a new task
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Get user ID from authenticated user
    const userId = req.user.id;

    // Create task using service
    const task = await taskCreate(userId, req.body);

    // Return success response
    res.status(201).json(successResponse(task));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Update an existing task
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Get user ID from authenticated user
    const userId = req.user.id;

    // Get task ID from request parameters
    const taskId = parseInt(req.params.id);

    // Update task using service
    const task = await taskUpdate(userId, taskId, req.body);

    // Check if task exists
    if (!task) {
      throw new NotFoundError('Task not found');
    }

    // Return success response
    res.json(successResponse(task));
  } catch (error) {
    next(error);
  }
}

/**
 * @summary
 * Delete a task
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Get user ID from authenticated user
    const userId = req.user.id;

    // Get task ID from request parameters
    const taskId = parseInt(req.params.id);

    // Delete task using service
    const success = await taskDelete(userId, taskId);

    // Check if task exists
    if (!success) {
      throw new NotFoundError('Task not found');
    }

    // Return success response
    res.json(successResponse({ message: 'Task deleted successfully' }));
  } catch (error) {
    next(error);
  }
}
