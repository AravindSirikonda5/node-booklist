const debug = require('debug')('app:bookController');

function bookController(navigation, connection) {
  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  async function getIndex(req, res) {
    debug('Geting books');

    let books;

    try {
      [books] = await connection.query('SELECT * FROM books');
    } catch (err) {
      debug(err.message);
    }

    res.render('book-list-view', {
      navigation,
      books,
      user: req.user
    });
  }

  async function getById(req, res) {
    debug('Geting book');

    try {
      const id = +req.params.id;
      const [book] = await connection.query('SELECT * FROM books WHERE id = ?', [id]);
      req.book = book[0];
      res.render('book-view', {
        navigation,
        book: req.book,
        user: req.user
      });
    } catch (err) {
      debug(err.message);
    }
  }

  return {
    middleware,
    getIndex,
    getById
  };
}

module.exports = bookController;
