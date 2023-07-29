const { User, schemas } = require("../../models/user");

const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    // console.log(user);

    const { error } = schemas.emailSchema.validate(req.body);
    // console.log(error);
    if (error) {
      throw HttpError(400, error.message);
    }

    //Якщо в body немає обов'язкового поля email, повертає json з ключем {"message":"missing required field email"} і статусом 400
    if (!user) {
      throw HttpError(400, "Missing required field email");
    }

    //Якщо користувач вже пройшов верифікацію відправити json з ключем {"message":"Verification has already been passed"} зі статусом 400 Bad Request
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    //Якщо з body все добре, виконуємо повторну відправку листа з verificationToken на вказаний email
    await sendEmail({
      to: email,
      subject: `Verify email: ${email}`,
      html: `To confirm te registration, please, click on the link below: <a href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here</a>`,
      text: `To confirm te registration, please, open the link below: ${BASE_URL}/api/users/verify/${user.verificationToken}`,
    });

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
