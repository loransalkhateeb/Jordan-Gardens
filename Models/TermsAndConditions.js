const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');

const TermsAndConditions = sequelize.define('TermsAndConditions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.TEXT, 
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

module.exports = TermsAndConditions;
