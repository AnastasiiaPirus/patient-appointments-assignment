const Patient = require('../models/patient');

exports.createPatient = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, email, phoneNumber } = req.body;

    const patient = await Patient.create({
      firstName,
      lastName,
      dateOfBirth,
      email,
      phoneNumber
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating patient',
      error: error.message
    });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching patients',
      error: error.message
    });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching patient',
      error: error.message
    });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, dateOfBirth, email, phoneNumber } = req.body;

    const [updated] = await Patient.update(
      { firstName, lastName, dateOfBirth, email, phoneNumber },
      {
        where: { id },
        returning: true
      }
    );

    if (updated === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient updated successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating patient',
      error: error.message
    });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Patient.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting patient',
      error: error.message
    });
  }
};