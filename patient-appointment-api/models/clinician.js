const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const Clinician = sequelize.define('Clinician', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  npiNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [10, 10], // NPI is always 10 digits
      isNumeric: true
    }
  },
  state: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  credential: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

module.exports = Clinician;