const config = require('../../config/config');

module.exports = {
  client: 'pg',
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
  },
  pool: { min: 2, max: 10 }
};
