// services/weatherService.js

const axios = require('axios');
const WeatherData = require('../models/WeatherData');
const DailySummary = require('../models/DailySummary');
const Alert = require('../models/Alert');



const API_KEY = 'your_openweathermap_api_key_here'; // replace with your OpenWeatherMap API key
 
 const  CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad']



// Function to fetch weather data for a given city


async function fetchWeatherData(city) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = response.data;

    // Destructure necessary fields from the API response
    const { temp, feels_like } = data.main;
    const { main } = data.weather[0];
    const { dt } = data;

    const weather = new WeatherData({
      city,
      temperature: temp,
      feelsLike: feels_like,
      mainCondition: main,
      timestamp: dt
    });

    // Save weather data to MongoDB
    await weather.save();
    console.log(`Weather data for ${city} saved successfully`);

    // Update daily summary
    await updateDailySummary(city, temp, main);
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
  }
}

// Function to update daily summary
async function updateDailySummary(city, temperature, mainCondition) {
  try {
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const summary = await DailySummary.findOne({ city, date: todayDate });

    if (summary) {
      summary.maxTemp = Math.max(summary.maxTemp, temperature);
      summary.minTemp = Math.min(summary.minTemp, temperature);
      summary.totalTemp += temperature;
      summary.readingsCount += 1;

      // Update dominant condition (simple example, can be improved)
      if (mainCondition === summary.dominantCondition) {
        summary.dominantConditionCount += 1;
      } else if (summary.dominantConditionCount <= summary.readingsCount / 2) {
        summary.dominantCondition = mainCondition;
        summary.dominantConditionCount = 1;
      }

      await summary.save();
    } else {
      const newSummary = new DailySummary({
        city,
        date: todayDate,
        maxTemp: temperature,
        minTemp: temperature,
        totalTemp: temperature,
        readingsCount: 1,
        dominantCondition: mainCondition,
        dominantConditionCount: 1
      });

      await newSummary.save();
    }
  } catch (error) {
    console.error('Error updating daily summary:', error);
  }
}

// Function to check alerts and trigger them if needed
async function checkAlerts() {
  try {
    const alerts = await Alert.find({ active: true });

    for (const alert of alerts) {
      const { city, threshold } = alert;

      const latestWeather = await WeatherData.findOne({ city }).sort({ timestamp: -1 });

      if (latestWeather) {
        if (latestWeather.temperature > threshold) {
          console.log(`Alert! The temperature in ${city} is ${latestWeather.temperature}°C, which exceeds the threshold of ${threshold}°C.`);
          // Implement further alerting mechanisms here (e.g., email notifications)
        }
      }
    }
  } catch (error) {
    console.error('Error checking alerts:', error);
  }
}

// Start the periodic fetching of weather data
function startWeatherDataFetching() {
  setInterval(async () => {
    console.log('Fetching weather data...');
    for (const city of CITIES) {
      await fetchWeatherData(city);
    }
    console.log('Weather data fetching complete.');
    await checkAlerts();
  }, 5 * 60 * 1000); // Every 5 minutes
}

module.exports = { startWeatherDataFetching };
