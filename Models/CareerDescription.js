const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');

const CareerDescription = sequelize.define('CareerDescription', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  job_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  responsibilities: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  benefits: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  career_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Careers',
      key: 'id',
    },
  },
  lang: {
    type: DataTypes.ENUM('ar', 'en'),
    allowNull: false,
    defaultValue: 'en',
  },
}, {
  timestamps: false,
});

module.exports = CareerDescription;
