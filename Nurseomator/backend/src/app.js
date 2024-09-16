const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorMiddleware = require('./middlewares/errorMiddleware');
const nurseRoutes = require('./routes/nurseRoutes');
const patientRecordRoutes = require('./routes/patientRecordRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/nurse', nurseRoutes);
app.use('/patient-record', patientRecordRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
