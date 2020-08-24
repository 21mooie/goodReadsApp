const express = require('express');

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
    res.render('books',
      {
        nav,
        title: 'Library',
        books
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
