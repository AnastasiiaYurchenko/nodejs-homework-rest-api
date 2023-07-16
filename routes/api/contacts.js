const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, listContacts);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post("/", authenticate, addContact);

router.delete("/:contactId", authenticate, isValidId, removeContact);

router.put("/:contactId", authenticate, isValidId, updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  updateStatusContact
);

module.exports = router;
