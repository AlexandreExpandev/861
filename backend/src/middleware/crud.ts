import { Request } from 'express';
import { ZodSchema } from 'zod';

/**
 * @summary CRUD controller for handling standard operations
 */
export class CrudController {
  private permissions: Array<{ securable: string; permission: string }>;

  constructor(permissions: Array<{ securable: string; permission: string }>) {
    this.permissions = permissions;
  }

  /**
   * Validate create operation
   */
  async create(req: Request, bodySchema?: ZodSchema): Promise<[any, null] | [null, Error]> {
    try {
      // Check user authentication
      if (!req.user) {
        return [null, new Error('Unauthorized')];
      }

      // Validate body if schema provided
      const body = bodySchema ? await bodySchema.parseAsync(req.body) : req.body;

      return [{
        credential: {
          idUser: req.user.idUser
        },
        body
      }, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  /**
   * Validate read operation
   */
  async read(req: Request, paramsSchema?: ZodSchema): Promise<[any, null] | [null, Error]> {
    try {
      // Check user authentication
      if (!req.user) {
        return [null, new Error('Unauthorized')];
      }

      // Validate params if schema provided
      const params = paramsSchema ? await paramsSchema.parseAsync(req.params) : req.params;

      return [{
        credential: {
          idUser: req.user.idUser
        },
        params
      }, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  /**
   * Validate update operation
   */
  async update(req: Request, paramsSchema?: ZodSchema, bodySchema?: ZodSchema): Promise<[any, null] | [null, Error]> {
    try {
      // Check user authentication
      if (!req.user) {
        return [null, new Error('Unauthorized')];
      }

      // Validate params if schema provided
      const params = paramsSchema ? await paramsSchema.parseAsync(req.params) : req.params;
      
      // Validate body if schema provided
      const body = bodySchema ? await bodySchema.parseAsync(req.body) : req.body;

      return [{
        credential: {
          idUser: req.user.idUser
        },
        params,
        body
      }, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  /**
   * Validate delete operation
   */
  async delete(req: Request, paramsSchema?: ZodSchema): Promise<[any, null] | [null, Error]> {
    try {
      // Check user authentication
      if (!req.user) {
        return [null, new Error('Unauthorized')];
      }

      // Validate params if schema provided
      const params = paramsSchema ? await paramsSchema.parseAsync(req.params) : req.params;

      return [{
        credential: {
          idUser: req.user.idUser
        },
        params
      }, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}

/**
 * @summary Create a success response object
 */
export function successResponse(data: any, metadata?: any) {
  return {
    success: true,
    data,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * @summary Create an error response object
 */
export function errorResponse(message: string, details?: any) {
  return {
    success: false,
    error: {
      message,
      ...(details && { details })
    },
    timestamp: new Date().toISOString()
  };
}

// Standard error status
export const StatusGeneralError = new Error('Internal server error');
