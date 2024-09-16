const pool = require('../config/db');
const { encrypt, decrypt } = require('../config/encryption');

class PatientRecord {
    static async create(nurse_id, patient_name, record) {
        try {
            const encryptedRecord = encrypt(record);

            const result = await pool.query(
                `INSERT INTO patient_records (nurse_id, patient_name, record) VALUES ($1, $2, $3) RETURNING *`,
                [nurse_id, patient_name, encryptedRecord]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create patient record: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query(`SELECT * FROM patient_records WHERE id = $1`, [id]);

            if (result.rows.length === 0) {
                return null;
            }

            const record = JSON.parse(result.rows[0].record);
            const decryptedRecord = decrypt(record);

            return {
                ...result.rows[0],
                record: decryptedRecord,
            };
        } catch (error) {
            throw new Error(`Could not find patient record: ${error.message}`);
        }
    }

    static async update(id, fields) {
        try {
            const updates = [];
            const values = [];

            // Add fields to updates if provided
            if (fields.patient_name) {
                updates.push(`patient_name = $${updates.length + 1}`);
                values.push(fields.patient_name);
            }
            if (fields.record) {
                const encryptedRecord = encrypt(fields.record);
                updates.push(`record = $${updates.length + 1}`);
                values.push(encryptedRecord);
            }
            if (updates.length === 0) {
                throw new Error('No fields to update');
            }
            values.push(id);

            const result = await pool.query(
                ` UPDATE patient_records SET ${updates.join(', ')} WHERE id = $${
                    values.length
                } RETURNING *`,
                values
            );

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update patient record: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query(
                `DELETE FROM patient_records WHERE id = $1 RETURNING *`,
                [id]
            );

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete patient record: ${error.message}`);
        }
    }
}

module.exports = PatientRecord;
