import faker from 'faker';
import uuid from 'node-uuid';
import cassandra from 'cassandra-driver';

import client from '../cassandra/client.mjs';
import bookMapper from "../mappers/book.mjs";

import {BOOKS_TABLE} from '../constants/index.mjs';

export const getBooks = async (req, res) => {
  try {
    const result = await bookMapper.findAll();

    res.json({books: result.toArray()});
  } catch (err) {
    res.status(500).json({err: err.toString()});
  }
};

export const createBook = (req, res) => {
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
        res.status(500).json({message: err.toString()});
      } else {
        res.json({result});
      }
    }
  );
};

export const deleteBook = (req, res) => {
  console.log(`deleting book with id = ${req.params.id}`);
  const query = `DELETE FROM ${BOOKS_TABLE} WHERE id = :id`;

  client.execute(
    query,
    {id: req.params.id},
    {prepare: true},
    (err, result) => {
      if (err) {
        res.status(500).json({message: err.toString()});
      } else {
        res.json({result});
      }
    }
  )
}
