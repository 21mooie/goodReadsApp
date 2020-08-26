const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [
  {
    title: 'War and Peace',
    author: 'Lev Nikolayevich Tolstoy',
    id: 1,
    bookId: 656,
  },
  {
    title: 'Les Misérables',
    author: 'Victor Hugo',
    id: 2,
    bookId: 24280,
  },
  {
    title: 'The Time Machine',
    author: 'H.G. Wells',
    id: 3
  },
  {
    title: 'A Journey into the Center of the Earth',
    author: 'Jules Verne',
    id: 4
  },
  {
    title: 'The Dark World',
    author: 'Henry Kuttner',
    id: 5
  },
  {
    title: 'The Wind in the Willows',
    author: 'Kenneth Grahame',
    id: 6
  },
  {
    title: 'Life On The Mississippi',
    author: 'Mark Twain',
    id: 7
  },
  {
    title: 'Childhood',
    author: 'Lev Nikolayevich Tolstoy',
    id: 8
  }
];
function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      res.send('inserting books');
      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to server');
          const db = client.db(dbName);
          const col = db.collection('books');
          const results = await col.insertMany(books);
          debug(results);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
