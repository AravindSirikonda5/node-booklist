const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:passport');

const passportConfig = (app, connection) => {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      (username, password, done) => {
        (async () => {
          try {
            debug('Authenticating user');
            const [user] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);

            if (user && user[0]) {
              bcrypt.compare(password, user[0].password, (err, result) => {
                if (result === true) {
                  const userObj = {
                    id: user[0].id,
                    username: user[0].username
                  };
                  done(null, userObj);
                } else {
                  done(null, false);
                }
              });
            } else {
              done(null, false);
            }
          } catch (err) {
            debug(err.message);
          }
        })();
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieves user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = passportConfig;
