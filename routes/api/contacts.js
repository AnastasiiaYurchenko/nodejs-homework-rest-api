const express = require("express");

// const ctrl = require("../../controllers/contacts");

// const ctrl = require("../../controllers/contacts");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", listContacts);
// console.log(listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, updateContact);

router.patch("/:contactId/favorite", isValidId, updateStatusContact);

module.exports = router;
