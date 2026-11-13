import { isConnectedToPostgres } from '../config/db.js';
export function getHealth(req, res) {
    res.json({
        status: 'ok',
        service: 'cvb-office-backend',
        version: '1.0.0',
        database: isConnectedToPostgres ? 'postgresql' : 'file-json-fallback',
        timestamp: new Date().toISOString(),
    });
}
