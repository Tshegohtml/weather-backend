const express = require('express');
const app = express();

const authRoutes = require("./routes/auth")
const weatherRoutes = require('./routes/weather');

const cors = require('cors');

app.use(express.json());
app.use(cors()); 


app.use('/api', authRoutes);
app.use('/api', weatherRoutes);


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});