const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    enum: ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'],
  },
  condition: {
    type: String,
    required: true,
    enum: ['Temperature', 'Humidity', 'Wind Speed', 'Weather Condition'],
  },
  threshold: {
    type: Number, 
    required: true,
  },
  message: {
    type: String, 
    required: true,
  },
  
  triggeredAt: {
    type: Date,
    default: Date.now, 
  }

});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
