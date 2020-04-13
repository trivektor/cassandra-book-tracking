import express from 'express';

import {getBooks} from '../controllers/books.mjs';

const router = express.Router();

router.get('/books', getBooks);

export default router;
