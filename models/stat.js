'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stat = sequelize.define('Stat', {
    website_id: DataTypes.INTEGER,
    performance: DataTypes.FLOAT,
    accessibility: DataTypes.FLOAT,
    best_practices: DataTypes.FLOAT,
    seo: DataTypes.FLOAT,
    time_fetch: DataTypes.STRING,
    time_to_first_byte: DataTypes.STRING,
    first_contentful_paint: DataTypes.STRING,
    first_meaningful_paint: DataTypes.STRING,
    speed_index: DataTypes.STRING,
    time_to_interactive: DataTypes.STRING,
    estimated_input_latency: DataTypes.STRING
  }, {});
  Stat.associate = function(models) {
    // associations can be defined here
  };
  return Stat;
};
