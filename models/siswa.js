"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Kelas, { foreignKey: "idKelas", as: "kelas", onDelete: 'CASCADE' });
      this.hasMany(models.Pembayaran, {
        foreignKey: "idSiswa",
        as: "pembayaran",
      });
    }
  }
  Siswa.init(
    {
      nama: DataTypes.STRING,
      idKelas: DataTypes.INTEGER,
      alamat: DataTypes.TEXT,
      telepon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Siswa",
      freezeTableName: true,
    }
  );
  return Siswa;
};
