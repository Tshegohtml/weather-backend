Here's a sample `README.md` for your project with detailed instructions on how to use the API endpoints:

---

# Weather and Places API

This project provides endpoints for fetching weather data for a given city and suggesting nearby places based on the weather conditions (either outdoor or indoor activities). The API integrates with OpenWeatherMap for weather data and Google Places API for nearby location-based suggestions.

## Endpoints

### 1. **GET /weather**
Fetches the weather data for a specified city and suggests nearby places based on the weather conditions (hot/sunny for outdoor activities, rainy/cloudy for indoor activities).

#### Request
- **Method**: POST
- **Endpoint**: `/weather`
- **Body**:
  ```json
  {
    "city": "CITY_NAME"
  }
  ```

#### Response
- **200 OK**: Weather data for the city, including the latitude, longitude, and weather conditions.
  ```json
  {
    "message": "Weather data fetched successfully",
    "weather": {
      "coord": { "lat": 51.5074, "lon": -0.1278 },
      "main": { "temp": 22.5 },
      "weather": [{ "main": "Clear" }]
    },
    "lat": 51.5074,
    "lng": -0.1278
  }
  ```
  Example: If the city is "London", the response would provide the latitude and longitude of London, along with current weather data like temperature and conditions.

- **400 Bad Request**: If the `city` field is missing in the request.
  ```json
  {
    "message": "City field cannot be empty."
  }
  ```

- **500 Internal Server Error**: If there is an error fetching weather data from the OpenWeather API or Google Places API.
  ```json
  {
    "message": "Error fetching weather data. Please try again."
  }
  ```

### 2. **GET /nearby-places**
Fetches nearby places based on the coordinates (latitude and longitude) extracted from the weather data. The places are filtered based on the weather conditions and are categorized as either "outdoor" or "indoor" activities.

#### Request
- **Method**: POST
- **Endpoint**: `/nearby-places`
- **Body**:
  ```json
  {
    "lat": "LATITUDE",
    "lng": "LONGITUDE",
    "query": "ACTIVITY_QUERY"
  }
  ```

#### Response
- **200 OK**: A list of nearby places based on the specified latitude, longitude, and activity type (indoor or outdoor).
  ```json
  {
    "message": "Suggested outdoor activities based on the weather.",
    "places": [
      {
        "name": "Hyde Park",
        "address": "London, UK"
      },
      {
        "name": "Greenwich Park",
        "address": "Greenwich, London, UK"
      }
    ]
  }
  ```

- **400 Bad Request**: If any of the required fields (`lat`, `lng`, `query`) are missing in the request.
  ```json
  {
    "message": "Latitude, longitude, and query are required."
  }
  ```

- **500 Internal Server Error**: If there is an error fetching places from the Google Places API.
  ```json
  {
    "message": "Error fetching nearby places. Please try again."
  }
  ```

## Setup Instructions

### 1. Clone the Repository
Clone this repository to your local machine.
```bash
git clone https://github.com/yourusername/weather-places-api.git
```

### 2. Install Dependencies
Navigate to the project directory and install the required dependencies using `npm`.
```bash
cd weather-places-api
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root of the project and add the following variables:

```env
WEATHER_API=your_openweathermap_api_key
GOOGLE_PLACES_API=your_google_places_api_key
```

You can obtain an API key for OpenWeatherMap [here](https://openweathermap.org/appid) and for Google Places [here](https://developers.google.com/maps/documentation/places/web-service/get-api-key).

### 4. Run the Server
Start the server using `npm start`:
```bash
npm start
```

The server will run on `http://localhost:5000`.

### 5. Test the Endpoints
Use an API testing tool like Postman or `curl` to test the endpoints.

#### Example 1: Fetch Weather Data for a City
```bash
curl -X POST http://localhost:5000/weather -H "Content-Type: application/json" -d '{"city": "London"}'
```

#### Example 2: Fetch Nearby Places
```bash
curl -X POST http://localhost:5000/nearby-places -H "Content-Type: application/json" -d '{"lat": 51.5074, "lng": -0.1278, "query": "outdoor activities"}'
```

## Technologies Used
- Node.js
- Express.js
- Axios for API calls
- OpenWeatherMap API for weather data
- Google Places API for nearby location data

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to adjust the text and any specific details based on your project setup or additional requirements!
