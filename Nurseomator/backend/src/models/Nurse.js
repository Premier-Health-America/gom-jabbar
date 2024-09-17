const pool = require('../config/db');
const bcrypt = require('bcrypt');

class Nurse {
    static async create(username, password) {
        try {
            // Hash password before storing
            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await pool.query(
                `INSERT INTO nurses (username, password) VALUES ($1, $2) RETURNING *`,
                [username, hashedPassword]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create nurse: ${error.message}`);
        }
    }

    static async findNurseByUsername(username) {
        try {
            const result = await pool.query(`SELECT * FROM nurses WHERE username = $1`, [username]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find nurse: ${error.message}`);
        }
    }

    static async findNurseById(nurseId) {
        try {
            const result = await pool.query('SELECT * FROM nurses WHERE id = $1', [nurseId]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find nurse: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query(`DELETE FROM nurses WHERE id = $1 RETURNING *`, [id]);

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete nurse: ${error.message}`);
        }
    }
}

module.exports = Nurse;
