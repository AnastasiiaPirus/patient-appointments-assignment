const Clinician = require('../models/clinician');
const { validateNPI } = require('../middleware/npiValidationMiddleware');

exports.createClinician = async (req, res) => {
  try {
    const { firstName, lastName, npiNumber, state, specialty, email } = req.body;

    // Validate NPI through external API
    const isValidNPI = await validateNPI(firstName, lastName, state, npiNumber);
    if (!isValidNPI) {
      return res.status(400).json({ message: 'Invalid NPI credentials' });
    }

    // Create clinician
    const clinician = await Clinician.create({
      firstName,
      lastName,
      npiNumber,
      state,
      specialty,
      email
    });

    res.status(201).json(clinician);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating clinician',
      error: error.message
    });
  }
};

exports.getAllClinicians = async (req, res) => {
  try {
    const clinicians = await Clinician.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.json(clinicians);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching clinicians',
      error: error.message
    });
  }
};

exports.getClinicianById = async (req, res) => {
  try {
    const clinician = await Clinician.findByPk(req.params.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!clinician) {
      return res.status(404).json({ message: 'Clinician not found' });
    }

    res.json(clinician);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching clinician',
      error: error.message
    });
  }
};

exports.updateClinician = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, npiNumber, state, specialty, email } = req.body;

    // Optional: Re-validate NPI if name or state changed
    if (firstName && lastName && state) {
      const isValidNPI = await validateNPI(firstName, lastName, state, npiNumber);
      if (!isValidNPI) {
        return res.status(400).json({ message: 'Invalid NPI credentials' });
      }
    }

    const [updated] = await Clinician.update(
      { firstName, lastName, npiNumber, state, specialty, email },
      {
        where: { id },
        returning: true
      }
    );

    if (updated === 0) {
      return res.status(404).json({ message: 'Clinician not found' });
    }

    res.json({ message: 'Clinician updated successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating clinician',
      error: error.message
    });
  }
};

exports.deleteClinician = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Clinician.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Clinician not found' });
    }

    res.json({ message: 'Clinician deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting clinician',
      error: error.message
    });
  }
};