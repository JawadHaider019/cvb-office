import { Request, Response } from 'express';
import { isConnectedToPostgres } from '../config/db.js';

export function getHealth(req: Request, res: Response) {
  res.json({
    status: 'ok',
    service: 'cvb-office-backend',
    version: '1.0.0',
    database: isConnectedToPostgres ? 'postgresql' : 'file-json-fallback',
    timestamp: new Date().toISOString(),
  });
}
