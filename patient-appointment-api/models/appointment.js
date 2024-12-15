const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Clinician = require('./clinician');
const Patient = require('./patient');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled'),
    defaultValue: 'Scheduled'
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Establish relationships
Appointment.belongsTo(Clinician, {
  foreignKey: {
    name: 'clinicianId',
    allowNull: false
  }
});
Appointment.belongsTo(Patient, {
  foreignKey: {
    name: 'patientId',
    allowNull: false
  }
});

module.exports = Appointment;