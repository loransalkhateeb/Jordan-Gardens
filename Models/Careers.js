const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');
const CareerDescription = require('./CareerDescription'); 

const Career = sequelize.define('Career', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberOfPositions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lang: {
    type: DataTypes.ENUM('ar', 'en'),
    allowNull: false,
    defaultValue: 'en',
  },
}, {
  timestamps: false,
});


Career.hasMany(CareerDescription, { foreignKey: 'career_id', onDelete: 'CASCADE' });
CareerDescription.belongsTo(Career, { foreignKey: 'career_id' });

module.exports = Career;
