
import AppError from '../../../shared/errors/appError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const {userName, password} = await createUserService.execute({
      name: 'create',
      email: 'create@asd.com',
      userName: 'create',
      password: '123'
    });

    const auth = await authenticateUserService.execute({userName, password})

    expect(auth).toHaveProperty('token');

  });

  it('should not be able to authenticate with userName not exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const {userName, password} = await createUserService.execute({
      name: 'create',
      email: 'create@asd.com',
      userName: 'create',
      password: '123'
    });

    const auth = await authenticateUserService.execute({userName: 'not exists', password})

    expect(auth).rejects.toBeInstanceOf(AppError);

  });


  it('should not be able to authenticate with password wrong', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const {userName, password} = await createUserService.execute({
      name: 'create',
      email: 'create@asd.com',
      userName: 'create',
      password: '123'
    });

    const auth = await authenticateUserService.execute({userName, password: '555'})

    expect(auth).rejects.toBeInstanceOf(AppError);

  });

})