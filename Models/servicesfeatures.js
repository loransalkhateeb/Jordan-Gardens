const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect'); 
const Service = require('./services');

const FeatureService = sequelize.define('FeatureService', {
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
  image: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  service_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Service, 
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', 
  },
}, {
  timestamps: false,
});


Service.hasMany(FeatureService, { foreignKey: 'service_id' });
FeatureService.belongsTo(Service, { foreignKey: 'service_id' });

module.exports = FeatureService;
