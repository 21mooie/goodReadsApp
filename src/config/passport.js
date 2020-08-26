const passport = require('passport');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // store user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // retreive user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
