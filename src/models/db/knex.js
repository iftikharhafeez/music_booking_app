const knexConfig = require('./knexFile');
const knex = require('knex')(knexConfig);

module.exports = knex;