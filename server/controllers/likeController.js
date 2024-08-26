const Like = require("../models/likesModel");
const Dish = require("../models/dishModel");
const User = require("../models/userModel");

exports.createLike = async (req, res) => {
  try {
    const { userId, dishId } = req.params;
    const user = await User.findById(req.params.userId);
    const dish = await Dish.findById(req.params.dishId);

    if (user && dish) {
      const newLike = await Like.create({ user: userId, dish: dishId });
      res.status(201).json({
        status: "success",
        data: newLike,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "user or dish not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
