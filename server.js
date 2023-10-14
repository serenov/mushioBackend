const express = require('express');
const mongoose = require('mongoose');

require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT || 3000;


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json());


app.use('/api', require('./routes/gateway')); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
