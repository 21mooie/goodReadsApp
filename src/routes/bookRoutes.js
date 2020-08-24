const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  const books = [{
    title: 'Les Miserables',
    author: 'Victor Hugo',
    id: 0
  },
  {
    title: 'The Time Machine',
    author: 'H.G. Wells',
    id: 1
  }
  ];
  bookRouter.route('/').get((req, res) => {
    const request = new sql.Request();
    request.query('select * from books').then((result) => {
      debug(result);
      res.render('books',
        {
          nav,
          title: 'Library',
          books: result.recordset
        });
    });
  });

  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    res.render('bookView',
      {
        nav,
        title: 'Library',
        book: books[id]
      });
  });
  return bookRouter;
}

module.exports = router;
