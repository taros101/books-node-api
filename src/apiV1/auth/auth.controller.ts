import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';
import User from '../users/user.model';
import Role from '../usersInRoles/usersInRoles.model';

export default class UserController {
  public authenticate = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    try {
      const user : any = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'Пользователь не найден'
        });
      }

      const matchPasswords = await bcrypt.compare(password, user.password);
      if (!matchPasswords) {
        return res.status(401).send({
          success: false,
          message: 'Неверный пароль'
        });
      }

      const id = user._id

      const role: any = await Role.find();
      const adminArr = role[0].admin;
      const adminCheck: any = adminArr.indexOf(id)
      let roles = ''

      if (adminCheck >= 0) {
        roles = 'admin'
      } else {
        roles = 'user'
      }

      const token = await jwt.sign({ email, id, roles }, config.JWT_ENCRYPTION, {
        expiresIn: config.JWT_EXPIRATION
      });
      
      res.status(200).send({
        success: true,
        message: 'Token generated Successfully',
        data: token
      });
    } catch (err) {
      console.log(err.message)
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };

  public register = async (req: Request, res: Response): Promise<any> => {
    const { email, password, img, userBooks } = req.body;
    
    try {
      const hash = await bcrypt.hash(password, config.SALT_ROUNDS);

      const userCheck : any = await User.findOne({ email: req.body.email });
      if (userCheck) {
        return res.status(404).send({
          success: false,
          message: 'Пользователь уже зарегистрирован'
        });
      }

      const user = new User({
        email,
        password: hash,
        img,
        userBooks
      });

      const newUser = await user.save();

      const userRoles: any = await Role.find();
      const userRolesId = userRoles[0]._id;
      const userArr = userRoles[0].user;
      const adminArr = userRoles[0].admin;

      userArr.push(newUser._id)

      const rolesUpdated = await Role.findByIdAndUpdate(
        userRolesId,
        {
          $set: {
            admin: adminArr,
            user: userArr
          }
        },
        { new: true }
      );

      res.status(201).send({
        success: true,
        message: 'User Successfully created',
        data: newUser
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };
}
