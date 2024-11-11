import { Router } from 'express';
import { adapter } from '../controllers/exampleController';

const apiRoute = Router();

// apiRoute.get('/mysql', getExample);
apiRoute.get('/adapter', adapter);

export default apiRoute;
