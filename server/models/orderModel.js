const { populate } = require("dotenv");
const mongoose = require("mongoose");
const ordersSchema = mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Sukuriamas ryšys tarp duombazės kolekcijų
ordersSchema.pre(/^find/, function (next) {
  this.populate({
    path: "dish",
    populate: {
      path: "likes",
      select: "_id",
    },
  }).populate({
    path: "user",
    select: "_id",
  });
  next();
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
