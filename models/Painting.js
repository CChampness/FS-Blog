const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Painting extends Model {}

Painting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogger: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exhibition_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topic_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'topic',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'painting',
  }
);

module.exports = Painting;
