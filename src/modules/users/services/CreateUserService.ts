import AppError from "../../../shared/errors/appError";
import { inject, injectable } from "tsyringe";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../typeorm/schemas/User";
import IHashProvider from "../providers/HashProvider/IHashProvider";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({name, email, userName, password}: ICreateUserDTO): Promise<User> {

    const findUser = await this.usersRepository.findByUserName(userName);

    if(findUser){
      throw new AppError('UserName already exists.', 400);
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({name, email, userName, password: passwordHash});
    
    return user;
  }
}

export default CreateUserService;