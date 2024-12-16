const express = require('express');
const router = express.Router();
const clinicianController = require('../controllers/clinicianController');
const { validateRequest, clinicianSchema } = require('../middleware/validationMiddleware');

// Create Clinician
router.post('/',
  validateRequest(clinicianSchema),
  clinicianController.createClinician
);

// Get All Clinicians
router.get('/', clinicianController.getAllClinicians);

// Get Clinician by ID
router.get('/:id', clinicianController.getClinicianById);

// Update Clinician
router.put('/:id',
  validateRequest(clinicianSchema),
  clinicianController.updateClinician
);

// Delete Clinician
router.delete('/:id', clinicianController.deleteClinician);

router.get('/getClinician/:npiNumber', clinicianController.getClinicianFromNPIRegistry);

module.exports = router;