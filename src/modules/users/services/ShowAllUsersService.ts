import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../typeorm/schemas/User";

@injectable()
class ShowAllUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute(): Promise<User[]> {

    const users = await this.usersRepository.findAll();
    return users;
  }
}

export default ShowAllUsersService;