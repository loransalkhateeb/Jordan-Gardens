const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');

const Feedback = sequelize.define('Feedback', {
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

module.exports = Feedback;
