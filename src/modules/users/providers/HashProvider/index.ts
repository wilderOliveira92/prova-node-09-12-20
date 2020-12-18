import {container} from 'tsyringe';
import BCryptHashProvider from './BCryptHashProvider';
import IHashProvider from './IHashProvider';

container.registerSingleton<IHashProvider>(
  'HashProvider', BCryptHashProvider
)