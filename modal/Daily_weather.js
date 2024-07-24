const mongoose = require('mongoose');

const dailySummarySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    enum: ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'],
  },
  date: {
    type: Date,
    required: true,
  },
  avgTemp: {
    type: Number, 
    required: true,
  },
  avgPress: {
    type: Number, 
    required: true,
  },
  avghumidiy: {
    type: Number, 
    required: true,
  },
  maxTemp: {
    type: Number, 
    required: true,
  },
  minTemp: {
    type: Number, 
    required: true,
  },
  dominantCondition: {
    type: String, // Most frequent weather condition of the day
    required: true,
  },
});

const DailySummary = mongoose.model('DailySummary', dailySummarySchema);

module.exports = DailySummary;
