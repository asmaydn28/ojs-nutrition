import { TokenPayload } from './auth.types';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
      userPermissions?: string[];
    }
  }
}

export {};

