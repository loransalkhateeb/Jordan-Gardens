const { DataTypes } = require('sequelize');
const sequelize = require('../Config/dbConnect');
const ProjectImage = require('./ProjectImage');
const Service = require('./services');  

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
  lang: {  
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'en',  
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Services', 
      key: 'id',
    }
  }
}, {
  timestamps: false, 
});

Project.hasMany(ProjectImage, { foreignKey: 'project_id', onDelete: 'CASCADE' });
ProjectImage.belongsTo(Project, { foreignKey: 'project_id' });

Project.belongsTo(Service, { foreignKey: 'service_id', as: 'service' }); 

module.exports = Project;
