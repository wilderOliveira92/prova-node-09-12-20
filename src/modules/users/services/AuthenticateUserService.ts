import {sign} from 'jsonwebtoken';
import AppError from "../../../shared/errors/appError";
import authConfig from '../../../config/auth';

import { inject, injectable } from "tsyringe";
import IHashProvider from "../providers/HashProvider/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../typeorm/schemas/User";

interface IRequest {
  userName: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}


@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ){}

  public async execute({userName, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUserName(userName);

    if(!user){
      throw new AppError('Fail on autentication, user name not found.', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if(!passwordMatch){
      throw new AppError('Fail on authentication.', 401);
    }

    const {expiresIn, secret} = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return {user, token};


  }

}

export default AuthenticateUserService;