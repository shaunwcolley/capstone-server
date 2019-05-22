'use strict';
module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    group_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  Website.associate = function(models) {
    // associations can be defined here
  };
  return Website;
};