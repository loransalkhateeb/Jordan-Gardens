
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');
const FeatureServices = require('./featureservices'); 

const Services = sequelize.define('Services', {
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
}, { timestamps: false });

Services.hasMany(FeatureServices, { foreignKey: 'service_id', onDelete: 'CASCADE' });
FeatureServices.belongsTo(Services, { foreignKey: 'service_id' });

module.exports = Services;
