import { Router } from 'express';
import Controller from './books.controller';
import verifyAdmin from '../../helpers/verifyAdmin';

const books: Router = Router();
const controller = new Controller();

// Retrieve all Books
books.get('/', controller.allBooks);

// Search books
books.get('/:searched', controller.searchedBooks);

// Sign In
books.post('/addBook', verifyAdmin, controller.addBook);

export default books;
