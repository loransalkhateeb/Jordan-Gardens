const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect'); 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role_user: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
    allowNull: false,
  },
  lang: {
    type: DataTypes.ENUM('ar', 'en'),
    allowNull: false,  
  },
}, {
  timestamps: false,
});

module.exports = User;
