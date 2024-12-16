const Appointment = require('../models/appointment');
const Clinician = require('../models/clinician');
const Patient = require('../models/patient');

exports.createAppointment = async (req, res) => {
  try {
    const { appointmentDate, status, reason, clinicianId, patientId } = req.body;

    // Validate clinician and patient exist
    const clinician = await Clinician.findByPk(clinicianId);
    const patient = await Patient.findByPk(patientId);

    if (!clinician || !patient) {
      return res.status(404).json({
        message: 'Clinician or Patient not found'
      });
    }

    const appointment = await Appointment.create({
      appointmentDate,
      status: status || 'Scheduled',
      reason,
      clinicianId,
      patientId
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating appointment',
      error: error.message
    });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Clinician, attributes: ['firstName', 'lastName', 'npiNumber', 'credential'] },
        { model: Patient, attributes: ['firstName', 'lastName'] }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        { model: Clinician, attributes: ['firstName', 'lastName', 'npiNumber'] },
        { model: Patient, attributes: ['firstName', 'lastName'] }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching appointment',
      error: error.message
    });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { appointmentDate, status, reason, clinicianId, patientId } = req.body;

    // Optional: Validate clinician and patient if provided
    if (clinicianId) {
      const clinician = await Clinician.findByPk(clinicianId);
      if (!clinician) {
        return res.status(404).json({ message: 'Clinician not found' });
      }
    }

    if (patientId) {
      const patient = await Patient.findByPk(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
    }

    const [updated] = await Appointment.update(
      { appointmentDate, status, reason, clinicianId, patientId },
      {
        where: { id },
        returning: true
      }
    );

    if (updated === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating appointment',
      error: error.message
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting appointment',
      error: error.message
    });
  }
};

// Additional method to get appointments by clinician
exports.getAppointmentsByClinician = async (req, res) => {
  try {
    const { clinicianId } = req.params;
    const appointments = await Appointment.findAll({
      where: { clinicianId },
      include: [
        { model: Clinician, attributes: ['firstName', 'lastName', 'npiNumber'] },
        { model: Patient, attributes: ['firstName', 'lastName'] }
      ]
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching clinician appointments',
      error: error.message
    });
  }
};