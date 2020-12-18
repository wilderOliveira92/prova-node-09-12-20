import AppError from "../../../shared/errors/appError";
import { inject, injectable } from "tsyringe";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUpdateUserDTO from "../dtos/IUpdateUserDTO";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../typeorm/schemas/User";



@injectable()
class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({id, name, email, userName, password}: IUpdateUserDTO): Promise<User> {
    
    const findUser = await this.usersRepository.findById(id);
    
    if(!findUser){
      throw new AppError('User not exists.')
    }

    const findUserName = await this.usersRepository.findByUserName(userName);

    if(findUserName && findUser.id !== findUserName.id){
      throw new AppError('UserName already exists.')
    }

    const user = await this.usersRepository.update( {id,name, email, userName, password});
    
    return user;
  }
}

export default UpdateUserService;