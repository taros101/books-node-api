import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import config from '../../config/config';
import Book from '../books/books.model';

export default class BooksController {
  public allBooks = async (req: Request, res: Response): Promise<any> => {
    try {
      const books = await Book.find().limit(4);
      if (!books) {
        return res.status(404).send({
          success: false,
          message: 'Books not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: books
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public searchedBooks = async (req: Request, res: Response): Promise<any> => {
    try {
      const searched = req.params.searched;
      const str = new RegExp('\w*' + searched + '\w*', 'i')

      const books: any = await Book.find({title: str});
      if (!books) {
        return res.status(404).send({
          success: false,
          message: 'Books not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: books
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public addBook = async (req: Request, res: Response): Promise<any> => {
    const { title, author, description, cover, price } = req.body;
    
    try {

      const book = new Book({
        title,
        author,
        description,
        cover,
        price
      });

      const newBook = await book.save();

      res.status(201).send({
        success: false,
        message: 'Book Successfully created',
        data: newBook
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };
}
