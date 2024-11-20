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
  image: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
}, 
);

module.exports = Blog;
