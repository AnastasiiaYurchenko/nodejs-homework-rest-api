// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");
// // console.log(contactsPath);

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// // const getContactById = async (contactId) => {};
// const getContactById = async (contactId) => {
//   const id = String(contactId);
//   const contacts = await listContacts();
//   const result = contacts.find((item) => item.id === id);

//   return result || null;
// };

// // const removeContact = async (contactId) => {};
// const removeContact = async (id) => {
//   const contactId = String(id);
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// };

// // const addContact = async (body) => {};
// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...body,
//   };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// // const updateContact = async (contactId, body) => {};
// const updateContact = async (contactId, data) => {
//   const contacts = await listContacts();
//   const id = String(contactId);
//   //знаходимо по індексу книгу, яку треба оновити
//   const index = contacts.findIndex((item) => item.id === id);
//   //якщо внигу не знайдено, то повернути null
//   if (index === -1) {
//     return null;
//   }
//   // інакше - повністю перезаписуємо книгу
//   contacts[index] = { id, ...data };
//   // перезаписуємо JSON
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   //повертаємо перезаписану книгу
//   return contacts[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
