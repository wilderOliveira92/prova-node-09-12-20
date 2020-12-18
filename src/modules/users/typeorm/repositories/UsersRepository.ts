import AppError from "../../../../shared/errors/appError";
import ICreateUserDTO from "modules/users/dtos/ICreateUserDTO";
import IUpdateUserDTO from "modules/users/dtos/IUpdateUserDTO";
import IUsersRepository from "modules/users/repositories/IUsersRepository";
import { getMongoRepository, MongoRepository } from "typeorm";
import User from "../schemas/User";


export default class UsersRepository implements IUsersRepository {

  private ormRepository: MongoRepository<User>;

  constructor(){
    this.ormRepository = getMongoRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async update({id,name, email, userName, password}: IUpdateUserDTO): Promise<User>{
    
    const findUser = await this.ormRepository.findOne(id);

    if(!findUser){
      throw new AppError('User not found');
    }

    Object.assign(findUser, {name, email, userName, password})

    await this.ormRepository.update(id, findUser);

    return findUser;
  }

  public async delete(id: string): Promise<void>{
    await this.ormRepository.delete(id);
  }

  public async findAll(): Promise<User[]>{
    const users = await this.ormRepository.find();

    return users;
  }

  public async findById(id: string): Promise<User | undefined>{
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async findByUserName(userName: string): Promise<User | undefined>{
    const users = await this.ormRepository.findOne({
      where: {
        userName,
      },
    });

    return users;
  }

}
