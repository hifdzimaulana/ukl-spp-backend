'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Pembayaran, {
        as: 'pembayaran',
        foreignKey: 'idSpp',
        onDelete: 'NO ACTION'
      })
    }
  }
  Spp.init({
    bulan: DataTypes.INTEGER,
    tahun: DataTypes.INTEGER,
    nominal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spp',
    freezeTableName: true
  });
  return Spp;
};