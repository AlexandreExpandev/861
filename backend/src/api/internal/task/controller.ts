import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  CrudController,
  errorResponse,
  StatusGeneralError,
  successResponse,
} from '../../../middleware/crud';
import {
  taskCreate,
  taskDelete,
  taskGet,
  taskList,
  taskUpdate,
} from '../../../services/task/taskService';

const securable = 'TASK';

/**
 * @summary
 * List all tasks for the authenticated user
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'READ' }]);

  const [validated, error] = await operation.read(req);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await taskList({
      userId: validated.credential.id,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    next(StatusGeneralError);
  }
}

/**
 * @summary
 * Get a specific task by ID
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'READ' }]);

  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const [validated, error] = await operation.read(req, paramsSchema);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await taskGet({
      userId: validated.credential.id,
      taskId: validated.params.id,
    });

    if (!data) {
      return res.status(404).json(errorResponse('Task not found'));
    }

    res.json(successResponse(data));
  } catch (error: any) {
    next(StatusGeneralError);
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
  const operation = new CrudController([{ securable, permission: 'CREATE' }]);

  const [validated, error] = await operation.create(req);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await taskCreate({
      userId: validated.credential.id,
      title: validated.params.title,
      description: validated.params.description,
      dueDate: validated.params.dueDate,
      priority: validated.params.priority,
    });

    res.status(201).json(successResponse(data));
  } catch (error: any) {
    next(StatusGeneralError);
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
  const operation = new CrudController([{ securable, permission: 'UPDATE' }]);

  const paramsSchema = z.object({
    id: z.coerce.number(),
    title: z.string().min(1).max(100),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
  });

  const [validated, error] = await operation.update(req, paramsSchema);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await taskUpdate({
      userId: validated.credential.id,
      taskId: validated.params.id,
      title: validated.params.title,
      description: validated.params.description,
      dueDate: validated.params.dueDate,
      priority: validated.params.priority,
    });

    if (!data) {
      return res.status(404).json(errorResponse('Task not found'));
    }

    res.json(successResponse(data));
  } catch (error: any) {
    next(StatusGeneralError);
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
  const operation = new CrudController([{ securable, permission: 'DELETE' }]);

  const paramsSchema = z.object({
    id: z.coerce.number(),
  });

  const [validated, error] = await operation.delete(req, paramsSchema);

  if (!validated) {
    return next(error);
  }

  try {
    const success = await taskDelete({
      userId: validated.credential.id,
      taskId: validated.params.id,
    });

    if (!success) {
      return res.status(404).json(errorResponse('Task not found'));
    }

    res.status(204).send();
  } catch (error: any) {
    next(StatusGeneralError);
  }
}
