const { User, schemas } = require("../../models/user");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  //   try {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const { error } = schemas.registerSchema.validate(req.body);
  // console.log(error);
  if (error) {
    throw HttpError(400, error.message);
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
  //   } catch (error) {
  //     next(error);
  //   }
};

module.exports = register;
