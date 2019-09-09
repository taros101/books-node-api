import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';
import User from './user.model';
import Role from '../usersInRoles/usersInRoles.model';

export default class UserController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(404).send({
          success: false,
          message: 'Users not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: users
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req.params.id, { password: 0 });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      
      res.status(200).send({
        success: true,
        data: user
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    const { email, userType, img, userBooks } = req.body;
    try {
      const userUpdated = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            email,
            userType,
            img,
            userBooks
          }
        },
        { new: true }
      );
      if (!userUpdated) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: userUpdated
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
