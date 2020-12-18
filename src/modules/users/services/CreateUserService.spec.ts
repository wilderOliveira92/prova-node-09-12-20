import AppError from '../../../shared/errors/appError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService';


describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'create',
      email: 'create@asd.com',
      userName: 'create',
      password: '123'
    });

    expect(user).toHaveProperty('id');

  });

  it('should not be able to create a new user with same userName', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'create',
      email: 'create@asd.com',
      userName: 'create',
      password: '123'
    });

    await createUserService.execute({
      name: 'create',
      email: 'create@asd.com',
      userName: 'create',
      password: '123'
    });

    await expect(
      createUserService.execute({
        name: 'create',
        email: 'create@asd.com',
        userName: 'create',
        password: '123'
      }),
    ).rejects.toBeInstanceOf(AppError);

  })


})