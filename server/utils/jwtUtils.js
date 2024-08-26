const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config.env` });

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 43200000 // milliseconds; 12 hours
  });
};

module.exports.decodeToken = (token) => {
  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  return decoded;
};
