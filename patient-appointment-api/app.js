const express = require('express');
const sequelize = require('./database');

// Import models to ensure table creation
const Clinician = require('./models/clinician');
const Patient = require('./models/patient');
const Appointment = require('./models/appointment');

// Import routes
const clinicianRoutes = require('./routes/clinicianRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
// Register routes
app.use('/clinicians', clinicianRoutes);
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);

// Database sync
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to synchronize database:', err);
  });

module.exports = app;