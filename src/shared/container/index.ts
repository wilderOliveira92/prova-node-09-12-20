import { container } from 'tsyringe'

import '../../modules/users/providers/HashProvider';
import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);