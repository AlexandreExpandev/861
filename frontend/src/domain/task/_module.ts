/**
 * @module task
 * @summary Manages all business logic related to tasks, including CRUD operations.
 * @domain functional
 * @dependencies axios, @tanstack/react-query, @/core/lib/api
 * @version 1.0.0
 */

// Domain public exports - Services
export * from './services/taskService';

// Domain public exports - Hooks
export * from './hooks/useTaskList';

// Domain public exports - Types
export * from './types';

export const moduleMetadata = {
  name: 'task',
  domain: 'functional',
  version: '1.0.0',
  publicServices: ['taskService'],
  publicHooks: ['useTaskList'],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['axios', '@tanstack/react-query'],
  },
} as const;
