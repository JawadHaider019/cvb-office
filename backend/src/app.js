import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
dotenv.config();
export function createApp() {
    const app = express();
    // Standard middleware
    app.use(cors());
    app.use(express.json({ limit: '10mb' }));
    // Mount API router
    app.use('/api', apiRouter);
    return app;
}
export const app = createApp();
export default app;
