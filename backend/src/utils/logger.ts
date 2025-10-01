import { config } from '../config';

/**
 * @summary Simple logging utility
 */
export const logger = {
  info: (message: string, data?: any) => {
    if (config.logging.level === 'info' || config.logging.level === 'debug') {
      console.log(`[INFO] ${message}`, data ? data : '');
    }
  },

  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error ? error : '');
  },

  debug: (message: string, data?: any) => {
    if (config.logging.level === 'debug') {
      console.log(`[DEBUG] ${message}`, data ? data : '');
    }
  },

  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data ? data : '');
  },
};
