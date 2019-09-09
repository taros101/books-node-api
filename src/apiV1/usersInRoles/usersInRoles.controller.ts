import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';
import usersInRoles from './usersInRoles.model';

export default class UserController {
  public usersInRoles = async (req: Request, res: Response): Promise<any> => {
    try {
      const role = await usersInRoles.find();

      if (!role) {
        return res.status(404).send({
          success: false,
          message: 'Role not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: role
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
