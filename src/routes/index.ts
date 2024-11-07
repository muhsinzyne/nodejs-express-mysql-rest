import { Router } from 'express';
import { adapter, getExample } from '../controllers/exampleController';

const apiRoute = Router();

apiRoute.get('/mysql', getExample);
apiRoute.get('/adapter', adapter);

export default apiRoute;
