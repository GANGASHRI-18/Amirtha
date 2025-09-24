const mongoose = require('mongoose');
const Department = require('./models/department.model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/civic_issues';

const departments = [
  { name: 'Public Works', categories: ['Pothole', 'Streetlight'] },
  { name: 'Sanitation', categories: ['Trash'] },
  { name: 'General', categories: ['Other'] }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected for seeding...');

    await Department.deleteMany({});
    console.log('Departments cleared.');

    await Department.insertMany(departments);
    console.log('Departments seeded.');

  } catch (err) {
    console.error(err.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedDB();