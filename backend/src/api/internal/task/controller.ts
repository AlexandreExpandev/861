import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { taskCreate, taskGet, taskList, taskUpdate, taskDelete } from '../../../services/task';
import { errorResponse, successResponse } from '../../../utils/response';
import { sanitizeInput } from '../../../utils/security';

/**
 * @summary List all tasks for the authenticated user
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }

    const tasks = await taskList(userId);
    res.json(successResponse(tasks));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @summary Get a specific task by ID
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id;
    const taskId = parseInt(req.params.id);

    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }

    if (isNaN(taskId)) {
      res.status(400).json(errorResponse('Invalid task ID'));
      return;
    }

    const task = await taskGet(userId, taskId);

    if (!task) {
      res.status(404).json(errorResponse('Task not found'));
      return;
    }

    res.json(successResponse(task));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @summary Create a new task
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }

    // Validate required fields
    const schema = z.object({
      title: z
        .string()
        .min(1, 'Title is required')
        .max(255, 'Title must be 255 characters or less'),
      description: z.string().max(1000, 'Description must be 1000 characters or less').optional(),
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json(errorResponse('Validation failed', result.error.format()));
      return;
    }

    // Sanitize user input to prevent XSS
    const sanitizedTitle = sanitizeInput(result.data.title);
    const sanitizedDescription = result.data.description
      ? sanitizeInput(result.data.description)
      : '';

    // Create the task with default status 'Pendente'
    const task = await taskCreate({
      userId,
      title: sanitizedTitle,
      description: sanitizedDescription,
      status: 'Pendente',
    });

    // Set Location header for the new resource
    res.setHeader('Location', `/api/internal/tasks/${task.id}`);

    // Return 201 Created with the new task
    res.status(201).json(successResponse(task));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @summary Update an existing task
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.id;
    const taskId = parseInt(req.params.id);

    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }

    if (isNaN(taskId)) {
      res.status(400).json(errorResponse('Invalid task ID'));
      return;
    }

    const task = await taskUpdate({
      id: taskId,
      userId,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
      priority: req.body.priority,
      completed: req.body.completed,
    });

    if (!task) {
      res.status(404).json(errorResponse('Task not found'));
      return;
    }

    res.json(successResponse(task));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @summary Delete a task
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.id;
    const taskId = parseInt(req.params.id);

    if (!userId) {
      res.status(401).json(errorResponse('Unauthorized'));
      return;
    }

    if (isNaN(taskId)) {
      res.status(400).json(errorResponse('Invalid task ID'));
      return;
    }

    const success = await taskDelete(userId, taskId);

    if (!success) {
      res.status(404).json(errorResponse('Task not found'));
      return;
    }

    res.json(successResponse({ message: 'Task deleted successfully' }));
  } catch (error: any) {
    next(error);
  }
}
