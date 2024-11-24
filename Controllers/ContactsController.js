
const Contact = require('../Models/Contacts');


exports.createContact = async (req, res) => {
  try {
    const { content, lang } = req.body;
    const iconFile = req.file; 

    if (!iconFile) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
   
    const newContact = await Contact.create({
      content,
      lang,
      icon: iconFile.filename,  
    });

    res.status(201).json({ message: 'Contact created successfully', contact: newContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

exports.getAllContacts = async (req, res) => {
    try {
      const { lang } = req.params;
  
      const contacts = await Contact.findAll({ where: { lang } });
  
      res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  };


  exports.getContactById = async (req, res) => {
    try {
      const { id, lang } = req.params;  
  
  
      const contact = await Contact.findOne({
        where: {
          id, 
          lang  
        },
      });
  
   
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.status(200).json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch contact' });
    }
  };
  


  exports.updateContact = async (req, res) => {
    const { id } = req.params;
  const { content, lang } = req.body;

  try {
    // Find the contact by ID
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: "contact not found" });
    }
    const imageUrl = req.file ? `${req.file.filename}` : contact.icon;
    // Update contact fields
    contact.content = content || contact.content;
    contact.lang = lang || contact.lang;
    contact.icon = imageUrl; 

    await contact.save();

    // Return the updated contact object
    res.status(200).json({ message: "contact updated successfully", contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating contact", error });
  }
  };
  


  exports.deleteContact = async (req, res) => {
    try {
      const { id, lang } = req.params;
      const contact = await Contact.findOne({
        where: {
          id,
          lang,
        },
      });
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found for the specified language' });
      }
      await contact.destroy();
      res.status(200).json({ message: 'Contacts deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete contact' });
    }
  };
  
