import { Router } from 'express';
import Controller from './admin.controller';
import verifyAdmin from '../../helpers/verifyAdmin';

const admin: Router = Router();
const controller = new Controller();

// Update a User with Id
admin.put('/:id', verifyAdmin, controller.editUser);

// Delete a User with Id
admin.delete('/:id', verifyAdmin, controller.deleteUser);

export default admin;
