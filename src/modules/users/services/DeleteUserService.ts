import AppError from "../../../shared/errors/appError";
import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(id: string): Promise<void> {

    const findUser = this.usersRepository.findById(id);

    if(!findUser){
      throw new AppError('User not exists.')
    }

     await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;