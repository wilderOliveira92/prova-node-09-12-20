import AppError from '../../../shared/errors/appError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import User from '../typeorm/schemas/User';
import CreateUserService from './CreateUserService';
import ShowAllUsersService from './ShowAllUsersService';


describe('ShowAllUsersService', () => {
  it('should be able to list users', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const showAllUsersService = new ShowAllUsersService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'create',
      email: 'create@asd.com',
      userName: 'create',
      password: '123'
    });

    await expect(
      showAllUsersService.execute()
    ).toBe(Array);

  });

})