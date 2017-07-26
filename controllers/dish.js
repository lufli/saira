const User = require('../models/user');
const Dish = require('../models/dish');

// show dishes
exports.show = function(req, res, next) {
  Dish.find(function(err, dishes) {
    if (err) { return next(err); }
    res.json({ dishes });
  });
};
// create a dish
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
// delete a dish
exports.delete = function(req, res, next) {
  
};
// update a dish

// search...
