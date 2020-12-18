
import {Router} from 'express'
import authRouter from '../modules/users/routes/auth.routes';
import usersRouter from '../modules/users/routes/users.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.json("<h1>Prova Backend Helpper<h1>");
})
routes.use('/users', usersRouter);
routes.use('/auth', authRouter)


export default routes;