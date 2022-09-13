'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Siswa, { foreignKey: 'idSiswa', as: 'siswa', onDelete: 'SET NULL' })
      this.belongsTo(models.Petugas, { foreignKey: 'idPetugas', as: 'petugas', onDelete: 'SET NULL' })
      this.belongsTo(models.Spp, { foreignKey: 'idSpp', as: 'spp', onDelete: 'RESTRICT' })
    }
  }
  pembayaran.init({
    idPetugas: DataTypes.INTEGER,
    idSpp: DataTypes.INTEGER,
    idSiswa: DataTypes.INTEGER,
    tanggalBayar: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pembayaran',
    freezeTableName: true
  });
  return pembayaran;
};