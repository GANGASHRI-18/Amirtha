const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
const usersRouter = require('./routes/users');
const reportsRouter = require('./routes/reports');
const analyticsRouter = require('./routes/analytics');
app.use('/api/users', usersRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/analytics', analyticsRouter);

// MongoDB connection
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/civic_issues";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});