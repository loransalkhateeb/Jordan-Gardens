const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect'); 
const Service = require('./services'); 

const Advantage = sequelize.define('Advantage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
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


Service.hasMany(Advantage, { foreignKey: 'service_id' });
Advantage.belongsTo(Service, { foreignKey: 'service_id' });

module.exports = Advantage;
