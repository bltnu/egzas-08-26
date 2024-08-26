const Dish = require("../models/dishModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
  try {
    const { userId, dishId } = req.params;
    const user = await User.findById(userId);
    const dish = await Dish.findById(dishId);

    if (user && dish) {
      const newOrder = await Order.create({ user: userId, dish: dishId });
      res.status(201).json({
        status: "success",
        data: newOrder,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "User or Dish not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate({
      path: "dish",
      populate: { path: "likes", select: "_id" },
    });
    if (orders.length === 0) {
      res.status(204).json({
        status: "success",
        message: "empty collection",
      });
    } else {
      res.status(200).json({
        status: "success",
        quantity: orders.length,
        data: orders,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
