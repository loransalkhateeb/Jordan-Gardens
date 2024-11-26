
const CreateCareer = require('../Models/CreateCareer'); 
const upload = require('../Config/multer');

exports.createCareer = async (req, res) => { 
    const { firstName, lastName, email, phoneNumber, yearsOfExperience, skills, careerId } = req.body;
  
    try {
    
      const existingCareer = await CreateCareer.findOne({ where: { email } });
      if (existingCareer) {
        return res.status(400).json({ message: 'The Email Address is Exsists' });
      }
  
     
      const newCareer = await CreateCareer.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        yearsOfExperience,
        uploadCv: req.file ? req.file.path : null, 
        skills,
        careerId,
      });
  
      return res.status(201).json({
        message: 'The Create Career is Successfully',
        career: newCareer,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Faild To Create Career Please Try Again', details: error.message });
    }
  };
  
  


  exports.getAllCVs = async (req, res) => {
    try {
  
      const careers = await CreateCareer.findAll();
  
      res.status(200).json(careers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch careers' });
    }
  };


exports.getCareerById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const career = await CreateCareer.findByPk(id, {
      include: {
        model: CreateCareer,
        attributes: ['name'] 
      }
    });
    
    if (!career) {
      return res.status(404).json({ message: "The Cv Does Not exists" });
    }

    return res.status(200).json(career);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Faild To Fetch the Cv" });
  }
};


exports.updateCareer = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, yearsOfExperience, uploadCv, skills, careerId } = req.body;

  try {
    const career = await CreateCareer.findByPk(id);
    if (!career) {
      return res.status(404).json({ message: "The Cv Does Not exsists" });
    }


    career.firstName = firstName || career.firstName;
    career.lastName = lastName || career.lastName;
    career.email = email || career.email;
    career.phoneNumber = phoneNumber || career.phoneNumber;
    career.yearsOfExperience = yearsOfExperience || career.yearsOfExperience;
    career.uploadCv = uploadCv || career.uploadCv;
    career.skills = skills || career.skills;
    career.careerId = careerId || career.careerId;

    await career.save();

    return res.status(200).json({
      message: "The CV Updated Successfully",
      career
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Faild To Update The CV" });
  }
};


exports.deleteCareer = async (req, res) => {
  const { id } = req.params;
  
  try {
    const career = await CreateCareer.findByPk(id);
    if (!career) {
      return res.status(404).json({ message: "The Cv Does Not exists" });
    }

    await career.destroy();

    return res.status(200).json({ message: "The CV Deleted Successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Faild To delete the cv" });
  }
};
