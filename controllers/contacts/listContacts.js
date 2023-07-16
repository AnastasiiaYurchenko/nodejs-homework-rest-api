const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.find(owner);
    return res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   message: "Server error",
    // });
  }
};

module.exports = listContacts;
