const Clinician = require('../models/clinician');
const {validateNPI} = require('../middleware/npiValidationMiddleware');
const axios = require('axios');

exports.createClinician = async (req, res) => {
  try {
    const {firstName, lastName, npiNumber, state, credential} = req.body;
    // Validate NPI through external API
    const isValidNPI = await validateNPI(firstName, lastName, state, npiNumber);
    if (!isValidNPI) {
      return res.status(400).json({message: 'Invalid NPI credentials'});
    }

    // Create clinician
    const clinician = await Clinician.create({
      firstName,
      lastName,
      npiNumber,
      state,
      credential
    });
    console.log(clinician);
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
      attributes: {exclude: ['createdAt', 'updatedAt']}
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
      attributes: {exclude: ['createdAt', 'updatedAt']}
    });

    if (!clinician) {
      return res.status(404).json({message: 'Clinician not found'});
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
    const {id} = req.params;
    const {firstName, lastName, npiNumber, state, credential} = req.body;

    // Optional: Re-validate NPI if name or state changed
    if (firstName && lastName && state) {
      const isValidNPI = await validateNPI(firstName, lastName, state, npiNumber);
      if (!isValidNPI) {
        return res.status(400).json({message: 'Invalid NPI credentials'});
      }
    }

    const [updated] = await Clinician.update(
      {firstName, lastName, npiNumber, state, credential},
      {
        where: {id},
        returning: true
      }
    );

    if (updated === 0) {
      return res.status(404).json({message: 'Clinician not found'});
    }

    res.json({message: 'Clinician updated successfully'});
  } catch (error) {
    res.status(500).json({
      message: 'Error updating clinician',
      error: error.message
    });
  }
};

exports.deleteClinician = async (req, res) => {
  try {
    const {id} = req.params;
    const deleted = await Clinician.destroy({where: {id}});

    if (deleted === 0) {
      return res.status(404).json({message: 'Clinician not found'});
    }

    res.json({message: 'Clinician deleted successfully'});
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting clinician',
      error: error.message
    });
  }
};

exports.getClinicianFromNPIRegistry = async (req, res) => {
  console.log('getClinicianFromNPIRegistry');
  try {
    const {npiNumber} = req.params;
    const response = await axios.get(process.env.NPI_API_BASE_URL, {
      params: {
        version: process.env.NPI_API_VERSION,
        number: npiNumber
      }
    });
    const results = response.data.results;
    if (results.length === 0) {
      return res.status(404).json({message: 'Clinician not found in NPI Registry'});
    }
    const {first_name, last_name, credential} = results[0].basic;
    const addresses = results[0].addresses;
    const state = addresses[0].state
    res.json({firstName: first_name, lastName: last_name, state, credential});
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching clinician from NPI Registry',
      error: error.message
    });
  }
}