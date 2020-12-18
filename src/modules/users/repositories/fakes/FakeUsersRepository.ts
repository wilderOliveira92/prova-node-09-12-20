import ICreateUserDTO from "modules/users/dtos/ICreateUserDTO";
import IUpdateUserDTO from "modules/users/dtos/IUpdateUserDTO";
import IUsersRepository from "modules/users/repositories/IUsersRepository";

import User from "../../typeorm/schemas/User";
import { ObjectID } from 'mongodb';
import AppError from '../../../../shared/errors/appError';



export default class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({name, email, userName, password}: ICreateUserDTO): Promise<User> {

    const user = new User();

    Object.assign(user, {id: new ObjectID(), name, email, userName, password})
    
    this.users.push(user);

    return user;
  }

  public async update({id,name, email, userName, password}: IUpdateUserDTO): Promise<User>{
 
    const newId = new ObjectID(id);
    const findUser = this.users.find( user => user.id === newId );

    if(!findUser){
      throw new AppError('User not found');
    }

    const findIndex = this.users.findIndex( user => user.id === newId );

    Object.assign(findUser, {name, email, userName, password});

    this.users[findIndex] = findUser;

    return findUser;

  }

  public async delete(id: string): Promise<void>{
    const newId = new ObjectID(id);
    const findUser = this.users.findIndex( user => user.id === newId );

    this.users.splice(findUser, 1);

  }

  public async findAll(): Promise<User[]>{    
     return this.users;
  }

  public async findById(id: string): Promise<User | undefined>{
    
    const newId = new ObjectID(id);
    console.log('newId:',newId)
    const findUser = this.users.find( user => user.id === newId );

    return findUser;
  }

  public async findByUserName(userName: string): Promise<User | undefined>{
    
    const findUser = this.users.find( user => user.userName === userName );

    return findUser;
  }

}
