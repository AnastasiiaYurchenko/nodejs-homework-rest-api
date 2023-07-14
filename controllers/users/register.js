const { User, schemas } = require("../../models/user");
const bcrypt = require("bcrypt");

const { HttpError } = require("../../helpers");

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

    const newUser = await User.create({ ...req.body, password: hashPassword }); //зберігаємо в базі захешований пароль, перед цим розпиливши req.body

    return res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
