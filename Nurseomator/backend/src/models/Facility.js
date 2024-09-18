const pool = require('../config/db');

class Facility {
    static async getAll() {
        try {
            const result = await pool.query('SELECT * FROM facilities');
            return result.rows;
        } catch (error) {
            throw new Error(`Could not retrieve facilities: ${error.message}`);
        }
    }
}

module.exports = Facility;
