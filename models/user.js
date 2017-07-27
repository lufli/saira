const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, unique: true, required: true,minlength:6 },
  // every user have to choose a role, 'USER' by default
  role: { type: String, required: true, enum: [ 'USER', 'CHEF', 'ADMIN' ], default: 'USER' },
  createdAt: { type: Date, required: true, default: Date.now },
  phone: { type: String },
  // only USER have following and favorite
  following: [ {type: Schema.Types.ObjectId, ref: 'user'} ],
  favorite: [ {type: Schema.Types.ObjectId, ref: 'dish'} ],
  // only CHEF have follower and dish
  follower: [ {type: Schema.Types.ObjectId, ref: 'user'} ],
  dish: [ {type: Schema.Types.ObjectId, ref: 'dish'} ]
});

// on save hook, encrypt password
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err) };

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

const modelClass = mongoose.model('user', userSchema);

module.exports = modelClass;
