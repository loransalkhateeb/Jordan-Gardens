const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');  

const Blog = sequelize.define('Blog', {
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
  images: {
    type: DataTypes.JSON, 
    allowNull: true, 
  },
  lang: {
    type: DataTypes.STRING,
    allowNull: false, 
    defaultValue: 'en',  
  },
}, {
  timestamps: false, 
});

module.exports = Blog;
