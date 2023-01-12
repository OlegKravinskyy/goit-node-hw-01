const fs = require("fs").promises;
const path = require("path");
// nanoid;
const contactsPath = path.join(__dirname, ".", "db", "contacts.json");
const contactsPath1 = path.join(__dirname, ".", "db", "contacts1.json");

const listContacts = async () => {
  try {
    const contactsList = JSON.parse(
      await fs.readFile(contactsPath, {
        encoding: "utf8",
      })
    );
    return contactsList;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const contactById = contactsList.find(({ id }) => id === contactId);
    return contactById;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const newContactsList = contactsList.filter(({ id }) => id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), {
      encoding: "utf8",
    });
    return contactsList;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
    };
    const contactsList = await listContacts();
    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList), {
      encoding: "utf8",
    });
    return contactsList;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
