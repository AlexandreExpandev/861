import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { taskCreate, taskGet, taskList, taskUpdate, taskDelete } from '../../../services/task';
import { successResponse } from '../../../utils/responses';
import { NotFoundError, ValidationError } from '../../../utils/errors';
import { sanitizeInput } from '../../../utils/security';

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

    // Validate request body
    const schema = z.object({
      title: z
        .string()
        .min(1, 'Title is required')
        .max(255, 'Title must be 255 characters or less'),
      description: z
        .string()
        .max(1000, 'Description must be 1000 characters or less')
        .optional()
        .default(''),
      dueDate: z.string().datetime({ message: 'Invalid date format' }).nullable().optional(),
      priority: z.number().int().min(1).max(3).optional().default(2),
    });

    let validatedData;
    try {
      validatedData = schema.parse(req.body);
    } catch (error) {
      if (error.name === 'ZodError') {
        const validationErrors = error.errors.map((err: any) => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        throw new ValidationError('Validation failed', validationErrors);
      }
      throw error;
    }

    // Sanitize user inputs to prevent XSS
    const sanitizedData = {
      ...validatedData,
      title: sanitizeInput(validatedData.title),
      description: validatedData.description ? sanitizeInput(validatedData.description) : '',
    };

    // Create task using service
    const task = await taskCreate(userId, sanitizedData);

    // Return success response with location header
    res.status(201).location(`/api/internal/tasks/${task.id}`).json(successResponse(task));
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
