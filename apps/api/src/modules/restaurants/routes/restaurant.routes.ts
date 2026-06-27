import { Router } from 'express';
import { authenticate } from '../../auth/middleware/authenticate.js';
import { restaurantController } from '../controllers/restaurant.controller.js';

export const restaurantRouter = Router();

restaurantRouter.post('/', authenticate, restaurantController.create);
restaurantRouter.get('/', restaurantController.list);
restaurantRouter.get('/me', authenticate, restaurantController.getOwn);
restaurantRouter.get('/:id', restaurantController.getById);
restaurantRouter.patch('/:id', authenticate, restaurantController.update);
restaurantRouter.delete('/:id', authenticate, restaurantController.delete);
