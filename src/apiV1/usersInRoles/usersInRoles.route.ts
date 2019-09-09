import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
// import verifyAdmin from '../../helpers/verifyAdmin';
import Controller from './usersInRoles.controller';

const usersInRoles: Router = Router();
const controller = new Controller();

// Retrieve all Users
usersInRoles.get('/', controller.usersInRoles);

export default usersInRoles;
