const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => console.log('Connected to MongoDB'),
    () => console.log('Failed to connect to MongoDB')
  );

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'tours.json'), 'utf8')
);
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8')
);
const reviews = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'reviews.json'), 'utf8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data loaded into database successfully');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
