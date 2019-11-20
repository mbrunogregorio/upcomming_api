import { Router } from 'express';

import MovieController from './app/controllers/MovieController';

const routes = new Router();

routes.get('/movies', MovieController.index);
routes.get('/movies/:id', MovieController.show);

export default routes;
