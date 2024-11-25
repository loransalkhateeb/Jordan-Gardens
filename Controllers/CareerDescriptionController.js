const CareerDescription = require('../Models/CareerDescription')
const Career = require('../Models/Careers')
exports.createCareerDescription = async (req, res) => {
    try {
      const { job_description, responsibilities, requirements, benefits, career_id, lang } = req.body;
  
     
      const career = await Career.findByPk(career_id);
      if (!career) {
        return res.status(404).json({
          error: lang === 'ar' ? 'المسمى الوظيفي غير موجود' : 'Career not found'
        });
      }
  
     
      const newCareerDescription = await CareerDescription.create({
        job_description,
        responsibilities,
        requirements,
        benefits,
        career_id,
        lang,
      });
  
      res.status(201).json({
        message: lang === 'ar' ? 'تم إنشاء الوصف الوظيفي بنجاح' : 'Career description created successfully',
        careerDescription: newCareerDescription,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: req.body.lang === 'ar' ? 'فشل في إنشاء الوصف الوظيفي' : 'Failed to create career description'
      });
    }
  };
  

  exports.getAllCareerDescriptions = async (req, res) => {
    try {
      const { lang } = req.params;
  
      const careerDescriptions = await CareerDescription.findAll({
        where: { lang },
      });
  
      if (careerDescriptions.length === 0) {
        return res.status(404).json({
          error: lang === 'ar' ? 'لا توجد أوصاف وظيفية لهذه اللغة' : 'No career descriptions found for this language'
        });
      }
  
      res.status(200).json(careerDescriptions);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: req.params.lang === 'ar' ? 'فشل في جلب أوصاف الوظائف' : 'Failed to fetch career descriptions'
      });
    }
  };
  

  exports.getCareerDescriptionById = async (req, res) => {
    try {
      const { id, lang } = req.params;
      if (!id || !lang) {
        return res.status(400).json({
          error: lang === 'ar' ? 'الرجاء توفير المعلمات اللازمة' : 'Please provide the necessary parameters',
        });
      }
  
      const careerDescription = await CareerDescription.findOne({
        where: { id, lang },
      });
  
      if (!careerDescription) {
        return res.status(404).json({
          error: lang === 'ar' ? 'الوصف الوظيفي غير موجود' : 'Career description not found'
        });
      }
  
      res.status(200).json(careerDescription);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: lang === 'ar' ? 'فشل في جلب الوصف الوظيفي' : 'Failed to fetch career description'
      });
    }
  };
  


  exports.getCareerDescriptionByCareer_Id = async (req, res) => {
    try {
      const { career_id, lang } = req.params;
      if (!career_id || !lang) {
        return res.status(400).json({
          error: lang === 'ar' ? 'الرجاء توفير المعلمات اللازمة' : 'Please provide the necessary parameters',
        });
      }
  
      const careerDescription = await CareerDescription.findOne({
        where: { career_id, lang },
      });
  
      if (!careerDescription) {
        return res.status(404).json({
          error: lang === 'ar' ? 'الوصف الوظيفي غير موجود' : 'Career description not found'
        });
      }
  
      res.status(200).json(careerDescription);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: lang === 'ar' ? 'فشل في جلب الوصف الوظيفي' : 'Failed to fetch career description'
      });
    }
  };
  

  exports.updateCareerDescription = async (req, res) => {
    try {
      const { id } = req.params;
      const { job_description, responsibilities, requirements, benefits, career_id, lang } = req.body;
  
      
      const careerDescription = await CareerDescription.findOne({
        where: { id, lang: req.params.lang }, 
      });
  
      if (!careerDescription) {
        return res.status(404).json({
          error: lang === 'ar' ? 'الوصف الوظيفي غير موجود' : 'Career description not found',
        });
      }
  
    
      careerDescription.job_description = job_description || careerDescription.job_description;
      careerDescription.responsibilities = responsibilities || careerDescription.responsibilities;
      careerDescription.requirements = requirements || careerDescription.requirements;
      careerDescription.benefits = benefits || careerDescription.benefits;
      careerDescription.career_id = career_id || careerDescription.career_id;
  
  
      if (lang) {
        careerDescription.lang = lang;
      }
  
     
      await careerDescription.save();
  
      res.status(200).json({
        message: lang === 'ar' ? 'تم تحديث الوصف الوظيفي بنجاح' : 'Career description updated successfully',
        careerDescription,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: req.body.lang === 'ar' ? 'فشل في تحديث الوصف الوظيفي' : 'Failed to update career description',
      });
    }
  };
  



  exports.updateCareerDescriptionByCareerId = async (req, res) => {
    try {
      const { career_id, lang } = req.params; 
      const { job_description, responsibilities, requirements, benefits, newLang } = req.body; 
  
  
      const careerDescription = await CareerDescription.findOne({
        where: { career_id, lang },
      });
  
      if (!careerDescription) {
        return res.status(404).json({
          error: lang === 'ar' ? 'الوصف الوظيفي غير موجود' : 'Career description not found',
        });
      }

      if (job_description) careerDescription.job_description = job_description;
      if (responsibilities) careerDescription.responsibilities = responsibilities;
      if (requirements) careerDescription.requirements = requirements;
      if (benefits) careerDescription.benefits = benefits;
  
  
      if (newLang && ['ar', 'en'].includes(newLang)) {
        careerDescription.lang = newLang;
      }
  
      await careerDescription.save();
  
      res.status(200).json({
        message: newLang
          ? newLang === 'ar'
            ? 'تم تحديث الوصف الوظيفي واللغة بنجاح'
            : 'Career description and language updated successfully'
          : lang === 'ar'
          ? 'تم تحديث الوصف الوظيفي بنجاح'
          : 'Career description updated successfully',
        careerDescription,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: lang === 'ar' ? 'فشل في تحديث الوصف الوظيفي' : 'Failed to update career description',
      });
    }
  };
  
  

  exports.deleteCareerDescription = async (req, res) => {
    try {
      const { id, lang } = req.params;
  
      const careerDescription = await CareerDescription.findOne({
        where: { id, lang },
      });
  
      if (!careerDescription) {
        return res.status(404).json({
          error: lang === 'ar' ? 'الوصف الوظيفي غير موجود' : 'Career description not found'
        });
      }
  
      await careerDescription.destroy();
  
      res.status(200).json({
        message: lang === 'ar' ? 'تم حذف الوصف الوظيفي بنجاح' : 'Career description deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: lang === 'ar' ? 'فشل في حذف الوصف الوظيفي' : 'Failed to delete career description'
      });
    }
  };
  
  

  exports.deleteCareerDescriptionByCareerId = async (req, res) => {
    try {
      const { career_id, lang } = req.params;
  
      const careerDescription = await CareerDescription.findOne({
        where: { career_id, lang },
      });
  
      if (!careerDescription) {
        return res.status(404).json({
          error: lang === 'ar' ? 'الوصف الوظيفي غير موجود' : 'Career description by career_id not found'
        });
      }
  
      await careerDescription.destroy();
  
      res.status(200).json({
        message: lang === 'ar' ? 'تم حذف الوصف الوظيفي بنجاح' : 'Career description by career_id deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: lang === 'ar' ? 'فشل في حذف الوصف الوظيفي' : 'Failed to delete career description by career_id'
      });
    }
  };