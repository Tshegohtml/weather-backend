const axios = require('axios');
require('dotenv').config();


const WEATHER_API_KEY = process.env.WEATHER_API;
const GOOGLE_API_KEY =  process.env.GOOGLE_PLACES_API;

// Fetch weather data for a specific city
const getWeather = async (req, res) => {
    const { city } = req.body;
    if (!city) {
        return res.status(400).json({ message: "City field cannot be empty." });
    }

    try {
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const weatherData = weatherResponse.data;
        res.json({ message: "Weather data fetched successfully", weather: weatherData });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error fetching weather data. Please try again." });
    }
};

// Fetch nearby places based on location coordinates and search query
const getNearbyPlaces = async (req, res) => {
    const { lat, lon, query } = req.body;

    if (!lat || !lon || !query) {
        return res.status(400).json({ message: "Latitude, longitude, and query are required." });
    }

    try {
        const placesResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${lat},${lon}&key=${GOOGLE_API_KEY}`
        );
        const places = placesResponse.data.results;
        res.json({ message: "Places fetched successfully", places: places });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error fetching nearby places. Please try again." });
    }
};

// Export controller functions
module.exports = {
    getWeather,
    getNearbyPlaces
};
