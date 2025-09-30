/**
 * @module task
 * @summary Manages all operations related to tasks, including CRUD and state management.
 * @domain functional
 * @dependencies @tanstack/react-query, @/core/lib/api
 * @version 1.0.0
 */

// Domain public exports - Hooks
export * from './hooks/useTasks';

// Domain public exports - Services
export * from './services/taskService';

// Domain public exports - Types
export * from './types';

// Module metadata
export const moduleMetadata = {
  name: 'task',
  domain: 'functional',
  version: '1.0.0',
  publicHooks: ['useTasks'],
  publicServices: ['taskService'],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['@tanstack/react-query'],
  },
} as const;
