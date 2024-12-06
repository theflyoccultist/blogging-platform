'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('blogposts', 'thumbnail', {
          type: Sequelize.STRING,
          allowNull: true,
      });
  },

  down: async (queryInterface) => {
      await queryInterface.removeColumn('blogposts', 'thumbnail');
  },
};