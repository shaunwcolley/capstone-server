'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Stats',
      'error_message', {
        type: Sequelize.STRING,
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Stats',
      'error_message',
    );
  }
};
