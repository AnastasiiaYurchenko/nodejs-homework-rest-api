const { Contact, schemas } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    console.log(req.user);
    const { _id: owner } = req.user; //беремо з req.user айді, переменовуємо його в owner
    const { error } = schemas.addSchema.validate(req.body);
    // console.log(error);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create({ ...req.body, owner }); //зберігаємо айді з req.user

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
