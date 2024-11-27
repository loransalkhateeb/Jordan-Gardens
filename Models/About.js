const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');

const About = sequelize.define('About', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  title_btn: {
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
  }
}, {
  timestamps: false,  
});

module.exports = About;
