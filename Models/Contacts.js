const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  icon: {
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

module.exports = Contact;
