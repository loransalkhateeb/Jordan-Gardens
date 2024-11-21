const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');  
const Services = require('./services'); 

const Advantages = sequelize.define('Advantages', {
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
      model: Services,  
      key: 'id',  
    },
    allowNull: false, 
  },
  lang: {
    type: DataTypes.ENUM('ar', 'en'),  
    allowNull: false, 
  },
}, {
  timestamps: false,  
});


Services.hasMany(Advantages, { foreignKey: 'service_id' });  
Advantages.belongsTo(Services, { foreignKey: 'service_id' });  

module.exports = Advantages;
