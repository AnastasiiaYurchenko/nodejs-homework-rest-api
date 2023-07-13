const { Contact, schemas } = require("../../models/contact");

const { HttpError } = require("../../helpers");

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

module.exports = getContactById;
