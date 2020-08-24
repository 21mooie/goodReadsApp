const express = require('express');

const bookRouter = express.Router();

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
      nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }],
      title: 'Library',
      books
    });
});

bookRouter.route('/:id').get((req, res) => {
  const { id } = req.params;
  res.render('bookView',
    {
      nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }],
      title: 'Library',
      book: books[id]
    });
});
module.exports = bookRouter;
