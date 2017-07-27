const Authentication = require('./controllers/authentication');
const Dish = require('./controllers/dish');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // user
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'this is a simple test message' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  // dish
  app.get('/dish/show', requireAuth, Dish.show);
  app.post('/dish/create', requireAuth, Dish.create);
  app.post('/dish/delete/:id', requireAuth, Dish.delete);

};
