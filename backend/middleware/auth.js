const jwt = require("jsonwebtoken");
const User = require("../models/User");

require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, secretKey);
    const user = await User.findOne({ _id: data.userId });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource." });
  }
};

module.exports = auth;
