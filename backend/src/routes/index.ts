import { Router } from 'express';
import healthRoutes from './health.routes.js';
import requestsRoutes from './requests.routes.js';
import contentRoutes from './content.routes.js';
import authRoutes from './auth.routes.js';

const apiRouter = Router();

apiRouter.use(healthRoutes);
apiRouter.use(requestsRoutes);
apiRouter.use(contentRoutes);
apiRouter.use(authRoutes);

export default apiRouter;
