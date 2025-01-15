const axios = require("axios");
const { db } = require("../config/firebase");
const {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} = require("firebase/firestore");
require("dotenv").config();

const WEATHER_API_KEY = process.env.WEATHER_API;
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API;

// Fetch Weather Data for a City
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
    res.json({
      message: "Weather data fetched successfully",
      weather: weatherData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error fetching weather data. Please try again." });
  }
};

// Fetch Nearby Places Based on Location
const getNearbyPlaces = async (req, res) => {
  const { lat, lon, query } = req.body;

  if (!lat || !lon || !query) {
    return res
      .status(400)
      .json({ message: "Latitude, longitude, and query are required." });
  }

  try {
    const placesResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${lat},${lon}&key=${GOOGLE_API_KEY}`
    );
    const places = placesResponse.data.results;
    res.json({ message: "Places fetched successfully", places: places });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error fetching nearby places. Please try again." });
  }
};

const addFavorite = async (req, res) => {
  const { place, userId } = req.body;

  if (!place || !userId) {
    return res
      .status(400)
      .json({
        message: "Place data and userId are required to add to favorites.",
      });
  }

  if (!place.name || !place.address || !place.location || !place.rating) {
    return res.status(400).json({
      message: "Place must include name, address, location, and rating.",
    });
  }

  try {
    console.log("Checking user in Firestore...");
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("User not found!");
      return res.status(400).json({ message: "User not found." });
    }

    console.log("User exists, adding favorite...");
    const docRef = await addDoc(collection(db, "favorites"), {
      ...place,
      userId,
      addedAt: new Date(),
    });

    res.json({
      message: "Place added to favorites successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error adding favorite to Firestore.",
        error: error.message,
      });
  }
};

const getFavorites = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "UserId is required to retrieve favorites." });
  }

  try {
    const q = query(collection(db, "favorites"), where("userId", "==", userId));

    const snapshot = await getDocs(q);

    const favorites = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ message: "Favorites retrieved successfully", favorites });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error retrieving favorites from Firestore.",
        error: error.message,
      });
  }
};

module.exports = {
  getWeather,
  getNearbyPlaces,
  addFavorite,
  getFavorites,
};
