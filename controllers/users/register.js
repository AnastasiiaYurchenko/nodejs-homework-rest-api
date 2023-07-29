const { User, schemas } = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); //перед тим як зареєструвати, дивимося чи в базі людина з таким самим email. findOne знаходить перше співпадіння. Якщо не знайшов, поверне null

    if (user) {
      throw HttpError(409, "Email in use"); //якщо такий email є , то викидаємо помилку зі своїи текстом "Email in use". Після помилки код преривається
    }

    const { error } = schemas.registerSchema.validate(req.body);
    // console.log(error);
    if (error) {
      throw HttpError(400, error.message);
    }

    const hashPassword = await bcrypt.hash(password, 10); //хешуємо пароль
    const avatarURL = gravatar.url(email); // генерація URL тимчасової аватарки
    const verificationToken = nanoid();
    // console.log(verificationToken);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    }); //зберігаємо в базі захешований пароль  та URL тимчасової аватарки, i verificationToken,  перед цим розпиливши req.body

    await sendEmail({
      to: email,
      subject: `Verify email: ${email}`,
      html: `To confirm te registration, please, click on the link below: <a href="${BASE_URL}/api/users/verify/${verificationToken}">Click here</a>`,
      text: `To confirm te registration, please, open the link below: ${BASE_URL}/api/users/verify/${verificationToken}`,
    });

    return res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
