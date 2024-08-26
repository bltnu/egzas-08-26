const User = require("../models/userModel");
const { createSecretToken, decodeToken } = require("../utils/jwtUtils");

// Be JWT
exports.register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      message: "user will have to log in manually",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "failed",
        message: "no permissions for this action",
      });
    }
    next();
  };
};

// SU JWT
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("missing email or password");
    }

    const user = await User.findOne({ email }).select("+password"); // mongoose metodai; suradus pagal email, paimamas slaptažodis, kuris įprastai nebūna tvaizduojamas išsitraukus duomenis, todėl reikia pliuso
    if (!user || !(await user.comparePasswords(password, user.password))) {
      throw new Error("wrong email or password");
    }

    const token = createSecretToken(user._id);

    res.status(200).json({
      status: "success",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // Patikrinti ar Authorisation headeryje yra token:
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("not authorised");
    }

    // Išsitraukti token:
    const token = authHeader.split(" ")[1];

    // Verifikuoti ir atkoduoti token:
    const decoded = decodeToken(token);
    if (!decoded || !decoded.id) {
      throw new Error("not authorised");
    }

    // Rasti vartotoja pagal atkoduota ID:
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("user not found");
    }

    // Prikabinti user prie req
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getUserByToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("not authorised");
    }
    const token = authHeader.split(" ")[1];
    const decoded = decodeToken(token);
    if (!decoded || !decoded.id) {
      throw new Error("not authorised");
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("user not found");
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};
