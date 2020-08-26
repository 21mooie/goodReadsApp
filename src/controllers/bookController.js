const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(nav) {
  function getIndex(req, res) {
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
  }
  function getById(req, res) {
    res.render('bookView',
      {
        nav,
        title: 'Library',
        book: req.book
      });
  }
  function IdMiddleware(req, res, next) {
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
  }

  function middleware(req, res, next) {
    if (req.user) {
      debug(req.user);
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getIndex, getById, middleware, IdMiddleware
  };
}

module.exports = bookController;
