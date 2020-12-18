
import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';
import AuthController from '../controllers/AuthController';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/', celebrate({
  [Segments.BODY]: {
    userName: Joi.string().required(),
    password: Joi.string().required()
  }
}) , authController.create);


export default authRouter;