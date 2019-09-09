import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';
import User from '../users/user.model';
import Role from '../usersInRoles/usersInRoles.model';

export default class UserController {
  public editUser = async (req: Request, res: Response): Promise<any> => {
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

  public deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }

      const role: any = await Role.find();
      const id = role[0]._id
      const adminArr = role[0].admin;
      const userArr = role[0].user;
      const userCheck: any = userArr.indexOf(req.params.id)

      userArr.splice(userCheck, 1)

      await Role.findByIdAndUpdate(
        id,
        {
          $set: {
            admin: adminArr,
            user: userArr
          }
        },
        { new: true }
      );

      res.status(204).send();
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
