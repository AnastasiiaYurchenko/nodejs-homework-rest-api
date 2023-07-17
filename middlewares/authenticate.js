const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env; //зі змінних оточення беремо секретний ключ

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers; //якщо токен не прийде, то authorization буде undefind, тому додаємо = ""
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401)); //переривається функція
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id); //перевірка чи є людина в базі

    //|| !user.token  - якщо юзер є, але він розлогінений, щоб не зміг посилати запити

    if (!user || !user.token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
