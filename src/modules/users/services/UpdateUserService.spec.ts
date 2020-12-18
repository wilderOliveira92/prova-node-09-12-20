import AppError from '../../../shared/errors/appError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService';
import UpdateUserService from './UpdateUserService';


describe('UpdateUserService', () => {
  it('should be able to update a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const updateUserService = new UpdateUserService(fakeUsersRepository);

    const {id , name, email, password, userName} = await createUserService.execute({
      name: 'create',
      email: 'create@asd.com',
      userName: 'create',
      password: '123'
    });


    const userAlter = await updateUserService.execute({id: id.toString() , name: 'teste', email,  password, userName})

    expect(userAlter.name).toEqual('teste');

  });

  it('should not be able to update a user not exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const updateUserService = new UpdateUserService(fakeUsersRepository);

    const {id , name, email, password, userName} = await createUserService.execute({
      name: 'create',
      email: 'create@asd.com',
      userName: 'create',
      password: '123'
    });

    await expect(
      updateUserService.execute({id: '5555' , name, email,  password, userName}),
    ).rejects.toBeInstanceOf(AppError);

  })


})