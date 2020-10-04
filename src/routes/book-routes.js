const express = require('express');
const bookController = require('../controllers/book-controllers');

const bookRouter = express.Router();

const router = (navigation, connection) => {
  const { middleware, getIndex, getById } = bookController(navigation, connection);
  bookRouter.use(middleware);
  bookRouter.route('/').get(getIndex);
  bookRouter.route('/:id').get(getById);
  return bookRouter;
};

module.exports = router;
