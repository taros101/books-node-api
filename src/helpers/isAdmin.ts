import * as jwt from "jwt-then";
import config from "../config/config";
import User from '../apiV1/users/user.model';

const isAdmin = async (req, res, next): Promise<any> => {
  try {
    const user = await User.findById(req.body.id, { password: 0 });
    console.log(req.user)
    if (user) {
        return res.status(404).send({
            success: false,
            message: 'User found',
            data: null
        });
    }

    next();
  } catch (err) {
    res.status(500).send({ auth: false, message: err });
  }
};

export default isAdmin;
