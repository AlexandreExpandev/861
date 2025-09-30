import { Router } from 'express';
import * as authController from '../api/external/security/auth/controller';

const router = Router();

// Authentication routes
router.post('/auth/login', authController.loginHandler);
router.post('/auth/register', authController.registerHandler);

export default router;
