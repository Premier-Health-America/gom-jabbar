const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Nurse = require('../models/Nurse');

describe('Location Report', () => {
    let nurseId;
    let nurseToken;

    beforeAll(async () => {
        const testNurse = await Nurse.create('test-location-nurse', '1234');
        nurseId = testNurse.id;

        // Generate JWT token
        const token = jwt.sign({ nurseId: testNurse.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        nurseToken = token;
    });

    afterAll(async () => {
        if (nurseId) {
            const deletedNurse = await Nurse.delete(nurseId);
        }
    });

    it('should report a new location', async () => {
        const res = await request(app)
            .post('/location/report')
            .set('Authorization', `Bearer ${nurseToken}`)
            .send({
                latitude: 40.712776,
                longitude: -74.005974,
                status: 'In motion',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.latitude).toBe('40.712776');
        expect(res.body.longitude).toBe('-74.005974');
        expect(res.body.status).toBe('In motion');
        expect(res.body.nurse_id).toBe(nurseId);
    });

    it('should update an existing location', async () => {
        const res = await request(app)
            .post('/location/report')
            .set('Authorization', `Bearer ${nurseToken}`) // same nurse to update the location
            .send({
                latitude: 41.878113,
                longitude: -87.629799,
                status: 'SOS',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.latitude).toBe('41.878113');
        expect(res.body.longitude).toBe('-87.629799');
        expect(res.body.status).toBe('SOS');
        expect(res.body.nurse_id).toBe(nurseId);
    });
});
