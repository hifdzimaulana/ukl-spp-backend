'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pembayaran', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPetugas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Petugas',
          key: 'id'
        }
      },
      idSpp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Spp',
          key: 'id'
        }
      },
      idSiswa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Siswa',
          key: 'id'
        }
      },
      tanggalBayar: {
        type: Sequelize.DATE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pembayaran');
  }
};