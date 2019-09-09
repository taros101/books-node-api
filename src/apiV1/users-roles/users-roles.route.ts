import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
// import isAdmin from '../../helpers/verifyAdmin';
import Controller from './users-roles.controller';

const usersRoles: Router = Router();
const controller = new Controller();

// Retrieve all Users
usersRoles.post('/addRole', controller.addRole);

export default usersRoles;
