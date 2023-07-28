const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  console.log(req.params);

  try {
    const user = await User.findOne({ verificationToken });

    //якщо користувач з таким токеном не знайдений, необхідно повернути Помилку 'Not Found'
    if (!user) {
      throw HttpError(404, "User not found");
    }

    //якщо користувач знайдений - встановлюємо verificationToken в null, а поле verify ставимо рівним true в документі користувача
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
