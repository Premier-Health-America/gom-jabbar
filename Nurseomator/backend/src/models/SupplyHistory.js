const pool = require('../config/db');

class SupplyHistory {
    static typeConsumption = 'consumption';
    static typeRestock = 'restock';
    static type_options = [this.typeConsumption, this.typeRestock];

    static async create(nurse_supply_id, type, quantity, delivery_date) {
        try {
            const result = await pool.query(
                `INSERT INTO supplies_history (nurse_supply_id, type, quantity, delivery_date)
                 VALUES ($1, $2, $3, $4) RETURNING *`,
                [nurse_supply_id, type, quantity, delivery_date]
            );

            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create supply history: ${error.message}`);
        }
    }
}

module.exports = SupplyHistory;
