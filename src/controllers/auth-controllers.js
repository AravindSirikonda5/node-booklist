const debug = require('debug')('app:authController');
const bcrypt = require('bcrypt');

function authController(connection) {
  function signUp(req, res) {
    try {
      debug('Adding user');
      const { username, password } = req.body;

      bcrypt.hash(password, 10, async (err, encrypted) => {
        const [results] = await connection.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [
          username,
          encrypted
        ]);

        const user = {
          id: results.insertId,
          username
        };

        req.login(user, () => {
          res.redirect('/books');
        });
      });
    } catch (err) {
      debug(err.message);
    }
  }

  function getSignIn(req, res) {
    res.render('sign-in');
  }

  function logOut(req, res) {
    req.logout();
    res.redirect('/');
  }

  return {
    signUp,
    getSignIn,
    logOut
  };
}

module.exports = authController;
