// Models/featureservices.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');

const FeatureServices = sequelize.define('FeatureServices', {
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
  lang: {
    type: DataTypes.ENUM('ar', 'en'),
    allowNull: false,
    defaultValue: 'en',
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Services', 
      key: 'id',
    },
  },
}, { timestamps: false });

module.exports = FeatureServices;
