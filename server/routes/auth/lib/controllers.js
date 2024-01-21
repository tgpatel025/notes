const { matchedData } = require("express-validator");
const { Users } = require("../../../models");
const { encryptPassword } = require("../../../utils/helpers");

const signup = async (req, res, next) => {
  try {
    const data = matchedData(req);

    const emailCount = await Users.findAll({
      where: { email: data.email },
      raw: true,
    });
    if (emailCount.length)
      return res
        .status(409)
        .json({ message: `User with ${data.email} already exists!` });

    data.password = encryptPassword(data.password);
    const user = await Users.create(data);
    if (!user)
      return res
        .status(500)
        .json({
          message: "Oops, something went wrong. Please try again in sometime!",
        });

    res.json({ message: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const data = matchedData(req);

    const query = {
      where: {
        email: data.email,
        password: encryptPassword(data.password),
      },
      attributes: { exclude: ["password"] },
      raw: true,
    };
    const user = await Users.findOne(query);
    if (!user)
      return res
        .status(401)
        .json({
          message: "Invalid credentials. Please check your email or password.",
        });

    req.session.user = user;

    res.json({ message: "Login successfully!" });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    req.session.destroy();
    res.end();
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Oops, something went wrong. Please try again in sometime!",
      });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
