const mongoose = require("mongoose");
const validator = require("validator");
const dishSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "dish names cannot be duplicates"],
      required: [true, "dish name is mandatory"],
    },
    description: {
      type: String,
      min: 20,
      max: 123,
      required: [true, "dish description is mandatory"],
    },
    photo: {
      type: String,
      unique: [true, "the photo URL must not be used more than once"],
      validate: [validator.isURL, "URL is not valid"],
      required: [true, "dish photo is mandatory"],
    },
    price: {
      type: Number,
      min: 0.1,
      required: [true, "dish price is mandatory"],
    },
    day: {
      type: String,
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      required: [true, "a dish must be associated with a day of the week"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
  // sitie reikalingi norint "populiuoti patiekalus laikais"
);

// populiavimas
dishSchema.virtual("likes", {
  ref: "Likes",
  foreignField: "dish",
  localField: "_id",
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
