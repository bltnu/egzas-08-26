const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is mandatory"],
  },
  email: {
    type: String,
    required: [true, "email is mandatory"],
    unique: [true, "the same email can be registered only once"],
    isLowercase: true,
    validate: [validator.isEmail, "email is not valid"],
  },
  password: {
    type: String,
    required: [true, "password is mandatory"],
    minlength: 8,
    validate: [validator.isStrongPassword, "password is not strong enough"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// Metodai

// Registracijos metu
//--- Slaptažodžio užslaptinimo middleware ---
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12); // hash cost 12 for more resilient and challenging passwords that cost 10;
  next();
});

// Prisijungimo metu
// --- Vartotojo įvesto ir duombazėje užslaptinto slaptažodžio palyginimas bei validavimas ---\
userSchema.methods.comparePasswords = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
