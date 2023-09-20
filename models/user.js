'use strict';
const {
  Model
} = require('sequelize');
// const { use } = require('../routes');  不懂為何自己跑出來?? 害我debug很久
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
     password: {
      type: DataTypes.STRING,
      allowNull:false
     },
     name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};