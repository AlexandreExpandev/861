import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CrudController, errorResponse, successResponse } from '../../../middleware/crud';
import { taskCreate, taskDelete, taskGet, taskList, taskUpdate } from '../../../services/task/taskService';
import { taskCreateSchema } from '../../../services/task/taskValidation';

const securable = 'TASK';

/**
 * @summary List all tasks for the authenticated user
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([
    { securable, permission: 'READ' }
  ]);
  
  const [validated, error] = await operation.read(req);
  
  if (!validated) {
    return next(error);
  }

  try {
    const data = await taskList({
      idUser: validated.credential.idUser
    });
    
    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @summary Create a new task
 */
export async function createHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([
    { securable, permission: 'CREATE' }
  ]);
  
  const [validated, error] = await operation.create(req);
  
  if (!validated) {
    return next(error);
  }

  try {
    // Validate request body against schema
    const validatedData = taskCreateSchema.parse(validated.body);
    
    const data = await taskCreate({
      idUser: validated.credential.idUser,
      ...validatedData
    });
    
    // Set Location header for the newly created resource
    res.location(`/api/internal/tasks/${data.idTask}`);
    
    // Return 201 Created with the task data
    res.status(201).json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json(errorResponse('Validation failed', error.errors));
    }
    next(error);
  }
}

/**
 * @summary Get a specific task by ID
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const paramsSchema = z.object({
    id: z.coerce.number()
  });

  const operation = new CrudController([
    { securable, permission: 'READ' }
  ]);
  
  const [validated, error] = await operation.read(req, paramsSchema);
  
  if (!validated) {
    return next(error);
  }

  try {
    const data = await taskGet({
      idUser: validated.credential.idUser,
      idTask: validated.params.id
    });
    
    if (!data) {
      return res.status(404).json(errorResponse('Task not found'));
    }
    
    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @summary Update an existing task
 */
export async function updateHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const paramsSchema = z.object({
    id: z.coerce.number()
  });

  const operation = new CrudController([
    { securable, permission: 'UPDATE' }
  ]);
  
  const [validated, error] = await operation.update(req, paramsSchema);
  
  if (!validated) {
    return next(error);
  }

  try {
    const data = await taskUpdate({
      idUser: validated.credential.idUser,
      idTask: validated.params.id,
      ...validated.body
    });
    
    if (!data) {
      return res.status(404).json(errorResponse('Task not found'));
    }
    
    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @summary Delete a task
 */
export async function deleteHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const paramsSchema = z.object({
    id: z.coerce.number()
  });

  const operation = new CrudController([
    { securable, permission: 'DELETE' }
  ]);
  
  const [validated, error] = await operation.delete(req, paramsSchema);
  
  if (!validated) {
    return next(error);
  }

  try {
    const success = await taskDelete({
      idUser: validated.credential.idUser,
      idTask: validated.params.id
    });
    
    if (!success) {
      return res.status(404).json(errorResponse('Task not found'));
    }
    
    res.json(successResponse({ deleted: true }));
  } catch (error: any) {
    next(error);
  }
}
