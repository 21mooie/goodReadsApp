const express = require('express');

const bookRouter = express.Router();

const books = [{
  title: 'Les Miserables',
  author: 'Victor Hugo',
  id: 1
},
{
  title: 'The Time Machine',
  author: 'H.G. Wells',
  id: 2
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

module.exports = bookRouter;