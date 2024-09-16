const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Nurse = require('../models/Nurse');
const PatientRecord = require('../models/PatientRecord');

describe('Patient Record', () => {
    let nurseId;
    let nurseToken;
    let patientReportId;

    beforeAll(async () => {
        const testNurse = await Nurse.create('test-patient-record-nurse', '1234');
        nurseId = testNurse.id;

        // Generate JWT token
        const token = jwt.sign({ nurseId: testNurse.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        nurseToken = token;
    });

    afterAll(async () => {
        if (nurseId) await Nurse.delete(nurseId);
        if (patientReportId) await PatientRecord.delete(patientReportId);
    });

    it('should create a new patient report', async () => {
        const res = await request(app)
            .post('/patient-record')
            .set('Authorization', `Bearer ${nurseToken}`)
            .send({
                patient_name: 'Frosty McSnowflake',
                record: 'Frosty was admitted to the clinic for a routine check-up. His vital signs are stable, with blood pressure at 120/80 mmHg and heart rate at 72 bpm.',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.patient_name).toBe('Frosty McSnowflake');
        expect(res.body.nurse_id).toBe(nurseId);

        patientReportId = res.body.id;
    });

    it('should update an existing patient report', async () => {
        const res = await request(app)
            .put(`/patient-record/${patientReportId}`)
            .set('Authorization', `Bearer ${nurseToken}`)
            .send({
                record: 'Frosty presented to the emergency department with severe symptoms. Immediate intervention was required due to critical changes in vital signs.',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.patient_name).toBe('Frosty McSnowflake');
        expect(res.body.nurse_id).toBe(nurseId);
    });
});
