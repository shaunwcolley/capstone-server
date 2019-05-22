'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      website_id: {
        type: Sequelize.INTEGER
      },
      performance: {
        type: Sequelize.FLOAT
      },
      accessibility: {
        type: Sequelize.FLOAT
      },
      best_practices: {
        type: Sequelize.FLOAT
      },
      seo: {
        type: Sequelize.FLOAT
      },
      time_fetch: {
        type: Sequelize.STRING
      },
      time_to_first_byte: {
        type: Sequelize.STRING
      },
      first_contentful_paint: {
        type: Sequelize.STRING
      },
      first_meaningful_paint: {
        type: Sequelize.STRING
      },
      speed_index: {
        type: Sequelize.STRING
      },
      time_to_interactive: {
        type: Sequelize.STRING
      },
      estimated_input_latency: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stats');
  }
};