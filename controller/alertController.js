// controllers/alertController.js

const Alert = require('../modal/alert');
const mongoose = require('mongoose');

// Create or Update Alert
exports.createAlert = async (req, res) => {
    try {
        const { city,condition ,threshold, message } = req.body;
        
        let alert = await Alert.findOne({ city });

        if (alert) {
            // Update existing alert
            alert.condition =condition;
            alert.threshold = threshold;
            alert.message = message;
            await alert.save();
            return res.status(200).json({ message: 'Alert updated successfully', alert });
        } else {
            // Create new alert
            alert = new Alert({
                city,
                threshold,
                condition,
                message
            });
            await alert.save();
            return res.status(201).json({ message: 'Alert created successfully', alert });
        }
    } catch (error) {
        console.error('Error creating or updating alert:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get All Alerts
exports.getAllAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find();
        return res.status(200).json(alerts);
    } catch (error) {
        console.error('Error fetching alerts:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.deactivateAlert = async (req, res) => {
    try {
        const { alertId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(alertId)) {
            return res.status(400).json({ message: 'Invalid alert ID' });
        }

        const alert = await Alert.findById(alertId);

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        await alert.deleteOne();

        return res.status(200).json({ message: 'Alert deleted successfully', alertId });
    } catch (error) {
        console.error('Error deleting alert:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
