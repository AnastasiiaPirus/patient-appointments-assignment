const Joi = require('joi');

const validateRequest = (schema) => {
  return (req, res, next) => {
    console.log('validateRequest');
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation Error',
        details: error.details.map(d => d.message)
      });
    }
    next();
  };
};

const clinicianSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  npiNumber: Joi.string().length(10).pattern(/^\d+$/).required(),
  state: Joi.string().length(2).uppercase().required(),
  credential: Joi.string()
});

const patientSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().iso().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^\+?1?\d{10,14}$/).required()
});

const appointmentSchema = Joi.object({
  appointmentDate: Joi.date().iso().required(),
  status: Joi.string().valid('Scheduled', 'Completed', 'Cancelled'),
  reason: Joi.string(),
  clinicianId: Joi.number().required(),
  patientId: Joi.number().required()
});

module.exports = {
  validateRequest,
  clinicianSchema,
  patientSchema,
  appointmentSchema
};