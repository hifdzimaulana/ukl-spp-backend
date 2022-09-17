'use strict';
const bcrypt = require('bcrypt')
const { BCRYPT_SALT } = process.env

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    const petugas = [
      {
        username: 'avgjoe',
        password: bcrypt.hashSync('@2PuluhRibuRupiah', bcrypt.genSaltSync(Number(BCRYPT_SALT))),
        namaPetugas: 'Average Joe',
        level: 'owner',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'janedoe',
        password: bcrypt.hashSync('Ar&13245', bcrypt.genSaltSync(Number(BCRYPT_SALT))),
        namaPetugas: 'Jane Doe',
        level: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'johndoe',
        password: bcrypt.hashSync('SelamatPagi1!', bcrypt.genSaltSync(Number(BCRYPT_SALT))),
        namaPetugas: 'John Doe',
        level: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]

    await queryInterface.bulkInsert('Petugas', petugas)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Petugas', null)
  }
};
