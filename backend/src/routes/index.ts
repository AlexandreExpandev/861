import { Router } from 'express';
import internalRoutes from './internalRoutes';
import externalRoutes from './externalRoutes';

const router = Router();

// External routes (public access)
router.use('/external', externalRoutes);

// Internal routes (authenticated access)
router.use('/internal', internalRoutes);

export default router;
