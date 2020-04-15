import express from 'express';

import {
  getBooks,
  createBook,
  deleteBook,
} from '../controllers/books.mjs';

const router = express.Router();

router.get('/books', getBooks);
router.post('/books', createBook);
router.delete('/books/:id', deleteBook);

export default router;
