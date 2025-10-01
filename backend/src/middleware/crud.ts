import { Request } from 'express';
import { ZodSchema } from 'zod';

/**
 * @summary
 * Security permission definition for CRUD operations
 */
export interface SecurityPermission {
  securable: string;
  permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
}

/**
 * @summary
 * Standard error response for general errors
 */
export const StatusGeneralError = {
  status: 500,
  message: 'An unexpected error occurred',
};

/**
 * @summary
 * Helper function to create success response objects
 */
export const successResponse = <T>(data: T, metadata?: any) => {
  return {
    success: true,
    data,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  };
};

/**
 * @summary
 * Helper function to create error response objects
 */
export const errorResponse = (message: string, code?: string, details?: any) => {
  return {
    success: false,
    error: {
      code: code || 'ERROR',
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
};

/**
 * @summary
 * Controller class for handling CRUD operations with security permissions
 */
export class CrudController {
  private permissions: SecurityPermission[];

  constructor(permissions: SecurityPermission[]) {
    this.permissions = permissions;
  }

  /**
   * Validates create operation permissions and request data
   */
  async create(req: Request, schema?: ZodSchema) {
    // In a real implementation, this would check user permissions
    // against the required permissions for this operation

    if (!schema) {
      return [{ credential: req.user, params: req.body }, null];
    }

    try {
      const validatedData = await schema.parseAsync(req.body);
      return [{ credential: req.user, params: validatedData }, null];
    } catch (error: any) {
      return [null, { status: 422, message: 'Validation failed', details: error.errors }];
    }
  }

  /**
   * Validates read operation permissions and request data
   */
  async read(req: Request, schema?: ZodSchema) {
    // In a real implementation, this would check user permissions
    // against the required permissions for this operation

    const params = { ...req.params, ...req.query };

    if (!schema) {
      return [{ credential: req.user, params }, null];
    }

    try {
      const validatedData = await schema.parseAsync(params);
      return [{ credential: req.user, params: validatedData }, null];
    } catch (error: any) {
      return [null, { status: 422, message: 'Validation failed', details: error.errors }];
    }
  }

  /**
   * Validates update operation permissions and request data
   */
  async update(req: Request, schema?: ZodSchema) {
    // In a real implementation, this would check user permissions
    // against the required permissions for this operation

    const combinedData = { ...req.params, ...req.body };

    if (!schema) {
      return [{ credential: req.user, params: combinedData }, null];
    }

    try {
      const validatedData = await schema.parseAsync(combinedData);
      return [{ credential: req.user, params: validatedData }, null];
    } catch (error: any) {
      return [null, { status: 422, message: 'Validation failed', details: error.errors }];
    }
  }

  /**
   * Validates delete operation permissions and request data
   */
  async delete(req: Request, schema?: ZodSchema) {
    // In a real implementation, this would check user permissions
    // against the required permissions for this operation

    if (!schema) {
      return [{ credential: req.user, params: req.params }, null];
    }

    try {
      const validatedData = await schema.parseAsync(req.params);
      return [{ credential: req.user, params: validatedData }, null];
    } catch (error: any) {
      return [null, { status: 422, message: 'Validation failed', details: error.errors }];
    }
  }
}
