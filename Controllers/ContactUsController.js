const { ContactUs } = require('../Models');

// إنشاء رسالة اتصال جديدة
exports.createContactUs = async (req, res) => {
  try {
    const { phone_number, email_address, physical_address, first_name, last_name, message, lang } = req.body;

    // إنشاء سجل جديد في الـ ContactUs
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
    res.status(500).json({
      error: lang === 'ar' ? 'فشل في إرسال الرسالة' : 'Failed to send message',
    });
  }
};

// الحصول على جميع الرسائل بناءً على اللغة
exports.getAllContactUs = async (req, res) => {
  try {
    const { lang } = req.params; // اللغة في الـ params

    // استرجاع جميع الرسائل حسب اللغة
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

// الحصول على رسالة بناءً على الـ id
exports.getContactUsById = async (req, res) => {
  try {
    const { id, lang } = req.params;

    // استرجاع الرسالة بناءً على الـ id واللغة
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

// تحديث رسالة الاتصال
exports.updateContactUs = async (req, res) => {
  try {
    const { id, lang } = req.params;
    const { phone_number, email_address, physical_address, first_name, last_name, message } = req.body;

    // التحقق من وجود الرسالة
    const contact = await ContactUs.findOne({
      where: { id, lang },
    });

    if (!contact) {
      return res.status(404).json({
        error: lang === 'ar' ? 'الرسالة غير موجودة' : 'Message not found',
      });
    }

    // تحديث الحقول بناءً على الـ body
    contact.phone_number = phone_number || contact.phone_number;
    contact.email_address = email_address || contact.email_address;
    contact.physical_address = physical_address || contact.physical_address;
    contact.first_name = first_name || contact.first_name;
    contact.last_name = last_name || contact.last_name;
    contact.message = message || contact.message;

    // حفظ التحديثات
    await contact.save();

    res.status(200).json({
      message: lang === 'ar' ? 'تم تحديث الرسالة بنجاح' : 'Message updated successfully',
      contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: lang === 'ar' ? 'فشل في تحديث الرسالة' : 'Failed to update message',
    });
  }
};

// حذف رسالة الاتصال
exports.deleteContactUs = async (req, res) => {
  try {
    const { id, lang } = req.params;

    // التحقق من وجود الرسالة
    const contact = await ContactUs.findOne({
      where: { id, lang },
    });

    if (!contact) {
      return res.status(404).json({
        error: lang === 'ar' ? 'الرسالة غير موجودة' : 'Message not found',
      });
    }

    // حذف الرسالة
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
