const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION No. 122! 💥 Shutting  down server');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

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

// console.log(process.env);
// Starts Server
const port = process.env.PORT || 3000;
const server = app.listen(port, (res) => {
  console.log(`listening on port: ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION No. 121! 💥 Shutting  down server');
  server.close(() => {
    process.exit(1);
  });
});
