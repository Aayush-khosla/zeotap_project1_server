const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    enum: ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'],
  },
  main: {
    type: String, 
    required: true,
  },
  temperature: {
    type: Number, 
    required: true,
  },
  feels_like: {
    type: Number, 
    required: true,
  },
  humidity: {
    type: Number, 
    required: true,
  },
  pressure: {
    type: Number, 
    required: true,
  },
  timestamp: {
    type: Date, 
    default: Date.now,
    required: true,
  },
});

const WeatherData = mongoose.model('WeatherData', weatherDataSchema);

module.exports = WeatherData;
