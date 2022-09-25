'use strict';
const { generateHashedPassword } = require('@utils/credential-generators')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    const petugas = [
      {
        username: 'avgjoe',
        password: await generateHashedPassword('@2PuluhRibuRupiah'),
        namaPetugas: 'Average Joe',
        level: 'owner',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'janedoe',
        password: await generateHashedPassword('Ar&13245'),
        namaPetugas: 'Jane Doe',
        level: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'johndoe',
        password: await generateHashedPassword('SelamatPagi1!'),
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
