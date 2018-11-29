const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

var UserSchema = new mongoose.Schema({
  username: {
    unique: true,
    type: String
  },
  password: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save', function(next) {
  var user = this

  if (this.isNew) {
      this.meta.createAt = this.meta.updateAt = Date.now();
  }
  else {
      this.meta.updateAt = Date.now();
  }
  // hash 加密 + 加盐
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
});

UserSchema.statics = {
  fetch: function(cb) {
    return this
        .find({})
        .sort('meta.updateAt')
        .exec(cb);
},
  findById: function(id, cb) {
    return this
            .findOne({_id: id})
            .exec(cb);
  }
}

module.exports = UserSchema