const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { validateRequest, patientSchema } = require('../middleware/validationMiddleware');

// Create Patient
router.post('/',
  validateRequest(patientSchema),
  patientController.createPatient
);

// Get All Patients
router.get('/', patientController.getAllPatients);

// Get Patient by ID
router.get('/:id', patientController.getPatientById);

// Update Patient
router.put('/:id',
  validateRequest(patientSchema),
  patientController.updatePatient
);

// Delete Patient
router.delete('/:id', patientController.deletePatient);

module.exports = router;