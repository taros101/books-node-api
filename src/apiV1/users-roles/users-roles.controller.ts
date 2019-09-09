import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';
import UserRole from './users-roles.model';

export default class UserController {
  public addRole = async (req: Request, res: Response): Promise<any> => {
    const { role } = req.body;
    
    try {
      const saveRole = new UserRole({
        role
      });

      const newRole = await saveRole.save();

      res.status(201).send({
        success: true,
        message: 'Role Successfully created',
        data: newRole
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };
}
