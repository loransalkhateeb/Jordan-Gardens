const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');

const ChooeseCompanyModel = sequelize.define('ChooeseCompanyModel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  lang: {
    type: DataTypes.ENUM('ar', 'en'),
    allowNull: false,
    defaultValue: 'en',
  },
  image: {
    type: DataTypes.STRING,  
    allowNull: true,  
  }
}, {
  timestamps: false,
});

module.exports = ChooeseCompanyModel;
