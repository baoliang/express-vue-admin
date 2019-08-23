'use strict';
const util = require('../../util');

module.exports = (sequelize, DataTypes) => {
  var Wholesale = sequelize.define('Wholesale', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true
    },
    names: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
    country: DataTypes.STRING,
    messages: DataTypes.TEXT
  }, util.addModelCommonOptions({
    tableName: 'Wholesales',
  }));
  return Wholesale;
};
