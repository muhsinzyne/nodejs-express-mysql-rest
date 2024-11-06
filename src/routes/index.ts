import { Router } from 'express';
import { adapter, getExample, typeOrm } from '../controllers/exampleController';

const apiRoute = Router();

apiRoute.get('/mysql', getExample);
apiRoute.get('/adapter', adapter);
apiRoute.get('/typeorm', typeOrm);

export default apiRoute;
