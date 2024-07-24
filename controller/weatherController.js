// controllers/weatherController.js

const WeatherData = require('../modal/Weather');
const DailySummary = require('../modal/Daily_weather');
const mongoose = require('mongoose');

// Get Current Weather for All Cities
exports.getCurrentWeather = async (req, res) => {
    try {
        const weatherData = await WeatherData.find().sort({ dt: -1 }).limit(6); // assuming 6 cities
        return res.status(200).json(weatherData);
    } catch (error) {
        console.error('Error fetching current weather:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get Daily Summary for a Specific Date and City
exports.getDailySummary = async (req, res) => {
    try {
        const { date, city } = req.params;
        const formattedDate = new Date(date);

        if (!formattedDate.getTime()) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        const summary = await DailySummary.findOne({ date: formattedDate, city });

        if (!summary) {
            return res.status(404).json({ message: 'Daily summary not found' });
        }

        return res.status(200).json(summary);
    } catch (error) {
        console.error('Error fetching daily summary:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
