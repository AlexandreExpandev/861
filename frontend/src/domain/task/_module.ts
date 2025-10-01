/**
 * @module task
 * @summary Manages all business logic related to tasks, including creation, listing, and updates.
 * @domain functional
 * @dependencies @tanstack/react-query, @/core/lib/api
 * @version 1.0.0
 */

// Domain public exports - Services
export * from './services/taskService';

// Domain public exports - Hooks
export * from './hooks/useTasks';

// Domain public exports - Types
export * from './types';

export const moduleMetadata = {
  name: 'task',
  domain: 'functional',
  version: '1.0.0',
  publicServices: ['taskService'],
  publicHooks: ['useTasks'],
  dependencies: {
    internal: ['@/core/lib/api'],
    external: ['@tanstack/react-query'],
  },
} as const;
