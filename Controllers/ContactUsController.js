const  ContactUs  = require('../Models/ContactUs');


exports.createContactUs = async (req, res) => {
    try {
      const { phone_number, email_address, physical_address, first_name, last_name, message, lang } = req.body;
  
      const newContact = await ContactUs.create({
        phone_number,
        email_address,
        physical_address,
        first_name,
        last_name,
        message,
        lang,
      });
  
      res.status(201).json({
        message: lang === 'ar' ? 'تم إرسال الرسالة بنجاح' : 'Message sent successfully',
        contact: newContact,
      });
    } catch (error) {
      console.error(error);
  

      const lang = req.body.lang || 'en';
      
      res.status(500).json({
        error: lang === 'ar' ? 'فشل في إرسال الرسالة' : 'Failed to send message',
      });
    }
  };
  

exports.getAllContactUs = async (req, res) => {
  try {
    const { lang } = req.params; 


    const messages = await ContactUs.findAll({
      where: { lang },
    });

    if (messages.length === 0) {
      return res.status(404).json({
        error: lang === 'ar' ? 'لا توجد رسائل بهذه اللغة' : 'No messages found for this language',
      });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: lang === 'ar' ? 'فشل في جلب الرسائل' : 'Failed to fetch messages',
    });
  }
};


exports.getContactUsById = async (req, res) => {
  try {
    const { id, lang } = req.params;

 
    const contact = await ContactUs.findOne({
      where: { id, lang },
    });

    if (!contact) {
      return res.status(404).json({
        error: lang === 'ar' ? 'الرسالة غير موجودة' : 'Message not found',
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: lang === 'ar' ? 'فشل في جلب الرسالة' : 'Failed to fetch message',
    });
  }
};


exports.updateContactUs = async (req, res) => {
    try {
      const { id } = req.params; 
      const { phone_number, email_address, physical_address, first_name, last_name, message, lang } = req.body; 
  
   
      const contact = await ContactUs.findOne({
        where: { id },
      });
  
      if (!contact) {
        return res.status(404).json({
          error: lang === 'ar' ? 'الرسالة غير موجودة' : 'Message not found',
        });
      }

      contact.phone_number = phone_number || contact.phone_number;
      contact.email_address = email_address || contact.email_address;
      contact.physical_address = physical_address || contact.physical_address;
      contact.first_name = first_name || contact.first_name;
      contact.last_name = last_name || contact.last_name;
      contact.message = message || contact.message;
  
   
      if (lang) {
        contact.lang = lang; 
      }
  
  
      await contact.save();
  
      res.status(200).json({
        message: lang === 'ar' ? 'تم تحديث الرسالة بنجاح' : 'Message updated successfully',
        contact,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: req.body.lang === 'ar' ? 'فشل في تحديث الرسالة' : 'Failed to update message',
      });
    }
  };
  




exports.deleteContactUs = async (req, res) => {
  try {
    const { id, lang } = req.params;


    const contact = await ContactUs.findOne({
      where: { id, lang },
    });

    if (!contact) {
      return res.status(404).json({
        error: lang === 'ar' ? 'الرسالة غير موجودة' : 'Message not found',
      });
    }

 
    await contact.destroy();

    res.status(200).json({
      message: lang === 'ar' ? 'تم حذف الرسالة بنجاح' : 'Message deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: lang === 'ar' ? 'فشل في حذف الرسالة' : 'Failed to delete message',
    });
  }
};
