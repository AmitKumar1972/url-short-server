'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('url_shortner', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      user_id : {
        type: Sequelize.STRING,
        allowNull: true
      },
      original_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      short_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      host_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      path_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      search_params: {
        type: Sequelize.STRING,
        allowNull: true
      },
      protocol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('url_shortner');
  },
};