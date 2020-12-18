import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ShowAllUsersService from "../services/ShowAllUsersService";
import UpdateUserService from "../services/UpdateUserService";


export default class UsersController {


  public async index(request: Request, response: Response): Promise<Response> {
    const showUsers = container.resolve(ShowAllUsersService);    
    const users = await showUsers.execute()

    return response.json(users);
  }


  public async create(request: Request, response: Response): Promise<Response> {
    
    const {name, email, password, userName} = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({name, email, password, userName})

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {name, email, password, userName} = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({id, name, email, password, userName})

    return response.json(user);

  }


  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id);

    return response.status(200).json('The user has been deleted.')

  }
}