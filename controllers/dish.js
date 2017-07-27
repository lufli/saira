const User = require('../models/user');
const Dish = require('../models/dish');

// show dishes
exports.show = function(req, res, next) {
  Dish.find(function(err, dishes) {
    if (err) { return next(err); }
    res.json({ dishes });
  });
};
// create a dish, this method is for CHEF only
exports.create = function(req, res, next) {
  var dishModel = new Dish();
  dishModel.name = req.body.name;
  dishModel.description = req.body.description;
  dishModel.price = req.body.price;
  dishModel.by = req.user._id;
  dishModel.save(function(err, dish) {
    if (err) { return next(err); }

    User.update(
      { _id: req.user._id },
      { $push: { dish: dish._id } },
      function(err) {
        if(err) { return next(err); }

        res.json({ dish });
      }
    );

  });
};
// delete a dish, this method is only for CHEF group
exports.delete = function(req, res, next) {
  Dish.findOne( { _id: req.params.id } , function(err, dish) {
    if (err) { return next(err); }
    if (!dish) res.status(422).send({ message: 'item not exist' });
    User.update( { _id: req.user._id }, { $pullAll: { dish: [req.params.id] }}, function(err) {
      if (err) { return next(err); }
    })
  });
  User.findOne({ _id: req.user._id }, function(err, user) {
    if (err) { return next(err); }
    res.json({ user });
  })
};
// update a dish
exports.update = function(req, res, next) {

  Dish.findOneAndUpdate({ _id: req.params.id }, { $set: req.body.dish }, { new: true }, function(err, dish) {
    if (err) { return next(err); }
    
    res.json({ dish });
  });
}
// search...
exports.searchById = function(req, res, next) {
  Dish.findOne({ _id: req.params.id }, function(err, dish) {
    if (err) { return next(err); }
    res.json({ dish });
  })
}
