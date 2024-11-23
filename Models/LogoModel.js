const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');

const Logo = sequelize.define('Logo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,  
    allowNull: true,  
  },
  lang: {
    type: DataTypes.ENUM('ar', 'en'),
    allowNull: false,
    defaultValue: 'en',
  },
}, {
  timestamps: false,
});

module.exports = Logo;
