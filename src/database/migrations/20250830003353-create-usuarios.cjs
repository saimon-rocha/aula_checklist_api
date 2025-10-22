'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.CHAR(11),
        allowNull: false,
        unique: true,
      },
      id_filial: {
        type: Sequelize.INTEGER,
        references: { model: 'filiais', key: 'id' },
        onDelete: 'SET NULL',
        allowNull: false,
      },
      id_ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, // sempre ativo ao criar
      },
      id_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // padrão usuário comum
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  },
};
