import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Non autorisé' });
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, config.jwtSecret) as any;
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Token invalide' });
  }
} 
