const pool = require('../config/db');

class Location {
    static status_options = ['Patient care', 'In motion', 'At rest', 'SOS'];

    static async insert(nurse_id, latitude, longitude, status) {
        try {
            // Avoid multiple rows for a nurse
            const result = await pool.query(
                `INSERT INTO locations (nurse_id, latitude, longitude, status)
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT (nurse_id) 
                 DO UPDATE SET latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude, status = EXCLUDED.status, updated_at = CURRENT_TIMESTAMP
                 RETURNING *`,
                [nurse_id, latitude, longitude, status]
            );

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not insert location: ${error.message}`);
        }
    }
}

module.exports = Location;
