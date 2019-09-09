import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import verifyAdmin from '../../helpers/verifyAdmin';
import Controller from './user.controller';

const user: Router = Router();
const controller = new Controller();

// Retrieve all Users
user.get('/', controller.findAll);

// Retrieve a Specific User
user.get('/:id', verifyToken, controller.findOne);

// Update a User with Id
user.put('/:id', controller.update);

export default user;
