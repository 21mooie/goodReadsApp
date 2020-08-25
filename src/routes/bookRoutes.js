const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');
        const db = client.db(dbName);
        const collection = await db.collection('books');
        const books = await collection.find().toArray();
        res.render('books',
          {
            nav,
            title: 'Library',
            books
          });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        const { id } = req.params;
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');
          const db = client.db(dbName);
          const collection = await db.collection('books');
          const book = await collection.findOne({ _id: new ObjectID(id) });
          debug(book);
          req.book = book;
        } catch (err) {
          debug(err.stack);
        }
        client.close();
        next();
      }());
    })
    .get((req, res) => {
      res.render('bookView',
        {
          nav,
          title: 'Library',
          book: req.book
        });
    });
  return bookRouter;
}

module.exports = router;
