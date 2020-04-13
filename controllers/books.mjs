import client from '../cassandra/client.mjs';

import {BOOKS_TABLE} from '../constants/index.mjs';

export const getBooks = async (req, res) => {
  const query = `SELECT * FROM ${BOOKS_TABLE}`;
  const result = await client.execute(query, []);

  res.json({books: result.rows});
};
