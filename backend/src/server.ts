import dotenv from 'dotenv';
import { app } from './app.js';
import { initDb, isConnectedToPostgres } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize Database connection and start HTTP server
async function startServer() {
  await initDb();

  app.listen(PORT, () => {
    console.log(`[CVB-Office Backend] Server running on http://localhost:${PORT}`);
    console.log(
      `[Database Status] Mode: ${isConnectedToPostgres ? 'PostgreSQL (Prisma)' : 'JSON fallback'}`
    );
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting CVB-Office backend:', err);
  process.exit(1);
});
