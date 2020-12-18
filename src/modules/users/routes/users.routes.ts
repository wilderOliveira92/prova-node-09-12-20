import {Router} from 'express';
import { celebrate, Segments, Joi} from 'celebrate';

import UsersController from '../controllers/UsersController';
import verifyAuthenticated from '../../../shared/middlewares/verifyAuthenticated'

const usersRouter = Router();
const usersController = new UsersController();


usersRouter.post('/', celebrate({
  [Segments.BODY] : {
    name: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string(),
  }
}) , usersController.create);


usersRouter.use(verifyAuthenticated);

usersRouter.get('/', usersController.index);

usersRouter.put('/:id', celebrate({
  [Segments.BODY] : {
    name: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
  }
}) ,usersController.update);

usersRouter.delete('/:id', usersController.delete);



export default usersRouter;