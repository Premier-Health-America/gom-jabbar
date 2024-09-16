const pool = require('../config/db');

class NurseSupply {
    static async create(nurse_id, supply_id, quantity, restocking_in_progress) {
        try {
            const result = await pool.query(
                `INSERT INTO nurse_supplies (nurse_id, supply_id, quantity, restocking_in_progress)
                 VALUES ($1, $2, $3, $4) RETURNING id`,
                [nurse_id, supply_id, quantity, restocking_in_progress]
            );

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create nurse supply: ${error.message}`);
        }
    }

    static async getNurseSupplyQty(nurse_id, supply_id) {
        try {
            let result = await pool.query(
                `SELECT id, quantity FROM nurse_supplies WHERE nurse_id = $1 AND supply_id = $2`,
                [nurse_id, supply_id]
            );

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find nurse supply: ${error.message}`);
        }
    }

    static async updateQuantity(nurse_supply_id, quantity) {
        try {
            const result = await pool.query(
                `UPDATE nurse_supplies
                 SET quantity = quantity - $1
                 WHERE id = $2`,
                [quantity, nurse_supply_id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update nurse supply quantity: ${error.message}`);
        }
    }
}

module.exports = NurseSupply;
