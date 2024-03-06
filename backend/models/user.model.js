const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcryptjs = require("bcryptjs");

const schema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  var user = this;
  // Only hash password if it has been modified or is new
  if (!user.isModified("password")) {
    return next();
  }
  //generate a salt
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    //hash the password using our new salt
    bcryptjs.hash(user.password, salt, (err, hash) => {
      if (err) {
        next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", schema);

module.exports = User;
