const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT || 4000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'your_db_user',
    password: process.env.DB_PASSWORD || 'your_db_password',
    database: process.env.DB_NAME || 'music_booking_db'
  },
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret'
};
  