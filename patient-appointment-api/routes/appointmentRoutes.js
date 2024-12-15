const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { validateRequest, appointmentSchema } = require('../middleware/validationMiddleware');

// Create Appointment
router.post('/',
  validateRequest(appointmentSchema),
  appointmentController.createAppointment
);

// Get All Appointments
router.get('/', appointmentController.getAllAppointments);

// Get Appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// Get Appointments by Clinician
router.get('/clinician/:clinicianId',
  appointmentController.getAppointmentsByClinician
);

// Update Appointment
router.put('/:id',
  validateRequest(appointmentSchema),
  appointmentController.updateAppointment
);

// Delete Appointment
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;