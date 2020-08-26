const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

function router(nav) {
  const {
    getIndex, getById, middleware, IdMiddleware
  } = bookController(nav);
  bookRouter.use(middleware);
  bookRouter.route('/').get(getIndex);

  bookRouter.route('/:id')
    .all(IdMiddleware)
    .get(getById);
  return bookRouter;
}

module.exports = router;
