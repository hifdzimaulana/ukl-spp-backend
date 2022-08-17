'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Siswa, {
        as: 'siswa',
        foreignKey: 'idKelas',
        onDelete: 'NO ACTION'
      })
    }
  }
  Kelas.init({
    namaKelas: DataTypes.STRING,
    jurusan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kelas',
    freezeTableName: true
  });
  return Kelas;
};