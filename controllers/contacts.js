const { Contact, schemas } = require("../models/contact");

const { HttpError } = require("../helpers");

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   message: "Server error",
    // });
  }
};

const getContactById = async (req, res, next) => {
  // console.log(req.params);
  try {
    const { contactId } = req.params;
    // const result = await Contact.findOne({_id: contactId}); // з - використовується для пошуку всього, крім contactId
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;

      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({
    //   message,
    // });
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    }); //передаємо 3-й параметр  {new:true}, щоб повернув новий обєкт, а не старий
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing field favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    }); //передаємо 3-й параметр  {new:true}, щоб повернув новий обєкт, а не старий
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
