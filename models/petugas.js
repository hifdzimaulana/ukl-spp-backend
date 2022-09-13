'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Petugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Pembayaran, {
        as: 'pembayaran',
        foreignKey: 'idPetugas',
      })
    }
  }
  Petugas.init({
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    namaPetugas: DataTypes.STRING,
    level: DataTypes.ENUM('superadmin', 'admin', 'owner')
  }, {
    sequelize,
    modelName: 'Petugas',
    freezeTableName: true
  });
  return Petugas;
};