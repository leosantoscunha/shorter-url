import { Router } from 'express';

const routes = Router();

routes.get('/', (_, response) => response.json({ message: 'hi there' }));

export default routes;
