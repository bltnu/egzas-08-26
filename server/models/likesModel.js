const mongoose = require("mongoose");
const likesSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "user is mandatory"],
  },
  dish: {
    type: mongoose.Schema.ObjectId,
    ref: "Dish",
    required: [true, "dish is mandatory"],
  },
  like: {
    type: Number,
    min: 1,
    max: 1,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// Sukuriamas ryšys tarp duombazės kolekcijų
likesSchema.pre(/^find/, function (next) {
  this.populate({
    path: "dish",
    select: "_id",
  }).populate({
    path: "user",
    select: "_id",
  });
  next();
});

const Likes = mongoose.model("Likes", likesSchema);

module.exports = Likes;
