const NurseSupply = require('../models/NurseSupply');
const SupplyHistory = require('../models/SupplyHistory');

const getMySupplies = async (req, res) => {
    const nurseId = req.nurse.nurseId;

    try {
        const supplies = await NurseSupply.getNurseSupplies(nurseId);
        res.status(200).json(supplies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const supplyRestock = async (req, res) => {
    const nurseId = req.nurse.nurseId;
    const { supply_id, quantity } = req.body;

    /**
     * For now this is just a random date but as part of future enhancements we could imagine calling
     * another API to estimate the delivery date based on the nurse's supply and location.
     */
    const randomDays = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    const today = new Date();
    let delivery_date = new Date(today);
    delivery_date.setDate(today.getDate() + randomDays);

    try {
        // Check if a nurse_supply entry exists
        const nurseSupply = await NurseSupply.getNurseSupplyQty(nurseId, supply_id);
        let nurse_supply_id;
        if (nurseSupply) {
            // Nurse_supply entry exists
            nurse_supply_id = nurseSupply.id;

            // Update current nurse_supply
            await NurseSupply.updateRestocking(nurseSupply.id, true);
        } else {
            // Create a new nurse_supply entry
            const newNurseSupply = await NurseSupply.create(nurseId, supply_id, quantity, true);
            nurse_supply_id = newNurseSupply.id;
        }

        const newHistory = await SupplyHistory.create(
            nurse_supply_id,
            SupplyHistory.typeRestock,
            quantity,
            delivery_date
        );
        res.status(201).json(newHistory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const supplyConsumption = async (req, res) => {
    const nurseId = req.nurse.nurseId;
    const { supply_id, quantity } = req.body;

    try {
        // Check if a nurse_supply entry exists
        const nurseSupply = await NurseSupply.getNurseSupplyQty(nurseId, supply_id);

        let nurse_supply_id;
        if (nurseSupply) {
            nurse_supply_id = nurseSupply.id;

            if (nurseSupply.quantity < quantity) {
                return res
                    .status(400)
                    .json({ message: 'Insufficient supply quantity for consumption.' });
            }

            await NurseSupply.updateQuantity(nurseSupply.id, quantity);
        } else {
            return res.status(400).json({
                message: 'Cannot consume supply that does not exist in nurse_supplies.',
            });
        }

        const newHistory = await SupplyHistory.create(
            nurse_supply_id,
            SupplyHistory.typeConsumption,
            quantity,
            null
        );
        res.status(201).json(newHistory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSupplyRequestOptions = async (req, res) => {
    res.status(200).json(SupplyHistory.type_options);
};

const getMyHistory = async (req, res) => {
    const nurseId = req.nurse.nurseId;

    try {
        const history = await NurseSupply.getNurseHistory(nurseId);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMySupplies,
    supplyRestock,
    supplyConsumption,
    getSupplyRequestOptions,
    getMyHistory,
};
