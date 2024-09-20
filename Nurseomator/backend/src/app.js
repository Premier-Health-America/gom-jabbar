const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorMiddleware = require('./middlewares/errorMiddleware');
const nurseRoutes = require('./routes/nurseRoutes');
const patientRecordRoutes = require('./routes/patientRecordRoutes');
const locationRoutes = require('./routes/locationRoutes');
const supplyRoutes = require('./routes/supplyRoutes');
const facilityRoutes = require('./routes/facilityRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/nurse', nurseRoutes);
app.use('/patient-record', patientRecordRoutes);
app.use('/location', locationRoutes);
app.use('/supply', supplyRoutes);
app.use('/facility', facilityRoutes);

app.use(errorMiddleware);

module.exports = app;
