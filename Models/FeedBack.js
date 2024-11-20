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
}, {
  timestamps: false,
});

module.exports = Feedback;
