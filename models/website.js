'use strict';
module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    group_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  Website.associate = (models) => {
    Website.hasMany(models.Stat, {
      as: 'stats',
      foreignKey: 'website_id',
    });
  };
  return Website;
};
