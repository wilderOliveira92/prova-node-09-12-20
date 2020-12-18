import AppError from '../../../shared/errors/appError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService';
import DeleteUserService from './DeleteUserService';


describe('DeleteUserService', () => {
  it('should be able delete a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const deleteUserService = new DeleteUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'create',
      email: 'create@asd.com',
      userName: 'create',
      password: '123'
    });

    const idReturn = String(user.id)

    
    await expect(
      deleteUserService.execute(idReturn)
    ).toBeCalled();

  });

  it('should not be able delete a user not exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();        
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const deleteUserService = new DeleteUserService(fakeUsersRepository);
    
    await createUserService.execute({
      name: 'create',
      email: 'create@asd.com',
      userName: 'create',
      password: '123'
    });

    await expect(
      deleteUserService.execute('55555')
    ).rejects.toBeInstanceOf(AppError);

  })


})