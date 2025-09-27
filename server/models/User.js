// server/models/User.js
const { pool } = require('../db');

class User {
  // Find user by email
  static async findOne({ email }) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  // Create a new user
  static async create({ name, email, password }) {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return result.rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }
}

module.exports = User;