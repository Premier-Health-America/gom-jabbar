const request = require('supertest');
const app = require('../app');
const Nurse = require('../models/Nurse');

describe('Nurse Creation', () => {
    let nurseId;

    afterAll(async () => {
        if (nurseId) {
            const deletedNurse = await Nurse.delete(nurseId);
        }
    });

    it('should create a new nurse', async () => {
        const res = await request(app).post('/nurse/register').send({
            username: 'test-nurse',
            password: '1234',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body.nurse).toHaveProperty('id');
        expect(res.body.nurse.username).toBe('test-nurse');

        nurseId = res.body.nurse.id;
    });

    it('should fail to create a duplicate nurse', async () => {
        const res = await request(app).post('/nurse/register').send({
            username: 'test-nurse',
            password: '1234',
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBeDefined();
    });
});
