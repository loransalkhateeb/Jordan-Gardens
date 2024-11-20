const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');
const ProjectImage = require('./ProjectImage'); 

const Project = sequelize.define('Project', {
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
}, {
  timestamps: false, 
});


Project.hasMany(ProjectImage, { foreignKey: 'project_id', onDelete: 'CASCADE' });
ProjectImage.belongsTo(Project, { foreignKey: 'project_id' });

module.exports = Project;
