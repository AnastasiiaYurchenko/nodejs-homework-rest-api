const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  try {
    //   console.log(req.user);
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: "" }); //робимо токен пустим

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
