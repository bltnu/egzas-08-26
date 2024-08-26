const Dish = require("../models/dishModel");

exports.searchDishes = async (req, res) => {
  try {
    const { day, name } = req.query;
    const filter = {};

    if (day) filter.day = day;
    if (name) filter.name = { $regex: name, $options: "i" }; // mongoDB operator, kuris iesko, ar yra kazkoks match, o i padaro, kad butu nesvarbu didzioji ar mazoji

    const filteredDishes = await Dish.find(filter).populate("likes");

    res.status(200).json({
      status: "success",
      results: filteredDishes.length,
      data: filteredDishes,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
