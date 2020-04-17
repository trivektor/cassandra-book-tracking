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

export const createBook = async (req, res) => {
  const {
    title = faker.random.words(),
    author = `${faker.name.firstName()} ${faker.name.lastName()}`,
    description = faker.lorem.paragraph(),
    publisher = faker.company.companyName(),
  } = req.body;

  try {
    const result = await bookMapper.insert({
      id: uuid.v4(),
      title,
      author,
      description,
      publisher,
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({err: err.toString()});
  }
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
