const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');

const AllContents = sequelize.define('AllContents', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lang: {
    type: DataTypes.ENUM('ar', 'en'),  
    allowNull: false,
    defaultValue: 'en',  
  },
}, {
  timestamps: false, 
});

module.exports = AllContents;
