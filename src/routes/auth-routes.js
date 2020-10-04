const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth-controllers');

const authRouter = express.Router();

const router = (connection) => {
  const { signUp, getSignIn, logOut } = authController(connection);
  authRouter.route('/sign-up').post(signUp);
  authRouter
    .route('/sign-in')
    .get(getSignIn)
    .post(
      passport.authenticate('local', {
        successRedirect: '/books',
        failureRedirect: '/'
      })
    );
  authRouter.route('/logout').get(logOut);
  return authRouter;
};

module.exports = router;
