const pool = require('../config/db');

class NurseSupply {
    static async getNurseSupplies(nurse_id) {
        try {
            const result = await pool.query(
                `SELECT ns.id AS id, ns.nurse_id, ns.supply_id, ns.quantity, 
                        ns.restocking_in_progress, s.name AS supply_name
                 FROM nurse_supplies ns
                 JOIN supplies s ON ns.supply_id = s.id
                 WHERE ns.nurse_id = $1`,
                [nurse_id]
            );

            return result.rows.map((row) => ({
                id: row.id,
                nurse_id: row.nurse_id,
                supply_id: row.supply_id,
                quantity: row.quantity,
                restocking_in_progress: row.restocking_in_progress,
                supply: {
                    supply_id: row.supply_id,
                    name: row.supply_name,
                },
            }));
        } catch (error) {
            throw new Error(`Could not fetch nurse supplies: ${error.message}`);
        }
    }

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

    static async updateRestocking(nurse_supply_id, restocking_in_progress) {
        try {
            const result = await pool.query(
                `UPDATE nurse_supplies
                 SET restocking_in_progress = $1
                 WHERE id = $2`,
                [restocking_in_progress, nurse_supply_id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not update nurse supply restocking_in_progress: ${error.message}`
            );
        }
    }

    static async getNurseHistory(nurse_id) {
        try {
            const result = await pool.query(
                `SELECT sh.id AS id, sh.type, sh.quantity, sh.delivery_date, 
                        ns.nurse_id, ns.supply_id, s.name AS supply_name, sh.updated_at
                 FROM supplies_history sh
                 JOIN nurse_supplies ns ON sh.nurse_supply_id = ns.id
                 JOIN supplies s ON ns.supply_id = s.id
                 WHERE ns.nurse_id = $1
                 ORDER BY sh.updated_at DESC`,
                [nurse_id]
            );

            return result.rows.map((row) => ({
                id: row.id,
                type: row.type,
                quantity: row.quantity,
                delivery_date: row.delivery_date,
                nurse_id: row.nurse_id,
                supply: {
                    supply_id: row.supply_id,
                    name: row.supply_name,
                },
                updated_at: row.updated_at,
            }));
        } catch (error) {
            throw new Error(`Could not fetch nurse  history: ${error.message}`);
        }
    }
}

module.exports = NurseSupply;
