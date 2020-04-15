import faker from 'faker';
import uuid from 'node-uuid';
import cassandra from 'cassandra-driver';

import client from '../cassandra/client.mjs';

import {BOOKS_TABLE} from '../constants/index.mjs';

export const getBooks = async (req, res) => {
  const query = `SELECT * FROM ${BOOKS_TABLE}`;
  const result = await client.execute(query, []);

  res.json({books: result.rows});
};

export const createBook = async (req, res) => {
  const query = `
  INSERT INTO ${BOOKS_TABLE}
    (id, title, author, description, isbn)
  VALUES
    (:id, :title, :author, :description, :isbn)
  `;

  client.execute(
    query,
    {
      id: uuid.v4(),
      title: faker.lorem.words(4),
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
      description: faker.lorem.text(),
      isbn: faker.random.uuid(),
    },
    {prepare: true, consistency: cassandra.types.consistencies.localQuorum},
    (err, result) => {
      if (err) {
        console.log({err});
        res.status(500).json({message: err.toString()});
      } else {
        res.json({result});
      }
    }
  );
};
