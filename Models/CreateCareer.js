const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');
const Career = require('../Models/Careers'); 


const CreateCareer = sequelize.define('CreateCareer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  
    validate: {
      isEmail: true, 
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yearsOfExperience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  uploadCv: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  skills: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  careerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Career, 
      key: 'id', 
    },
    allowNull: false,
  },
}, {
  timestamps: false, 
});


CreateCareer.belongsTo(Career, { foreignKey: 'careerId', onDelete: 'CASCADE' });

module.exports = CreateCareer;
