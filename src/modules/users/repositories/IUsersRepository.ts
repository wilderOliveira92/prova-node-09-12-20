import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUpdateUserDTO from "../dtos/IUpdateUserDTO";
import User from "../typeorm/schemas/User";

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(data: IUpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByUserName(userName: string): Promise<User | undefined>;
}