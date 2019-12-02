const { Pool } = require('pg')
const pool = new Pool({
  host: 'localhost',
  user: 'Admin',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

module.exports = {
  pool: pool
}