import { UserPayload } from '../services/auth/authTypes';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
