const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  // якщо isValidObjectId(id) повертає false , тов next передаємо помилку зі статусом 400 і своїм текстом
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }
  //якщо id валідне, то підемо далі
  next();
};

module.exports = isValidId;
