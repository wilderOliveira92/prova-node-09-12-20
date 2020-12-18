import { Request, Response } from "express";
import {container} from 'tsyringe';
import AuthenticateUserService from "../services/AuthenticateUserService";

export default class AuthController {

  public async create(request: Request, response: Response): Promise<Response> {
    const {userName, password} = request.body;

    const authService = container.resolve(AuthenticateUserService);

    const {user, token} = await authService.execute({userName, password});
    delete user.password;

    return response.json({user, token});
    
  }

}