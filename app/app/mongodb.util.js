// app/utils/mongodb.util.js
const { MongoClient } = require('mongodb');

class MongoDB {
  static client = null;
  static db = null;

  /**
   * Connect to MongoDB and set static db
   * @param {string} uri - connection string
   * @param {string} dbName - database name
   */
  static async connect(uri, dbName) {
    if (this.client) return this.client;
    this.client = new MongoClient(uri);
    await this.client.connect();
    // set db (dbName nếu có, nếu không thì lấy từ URI)
    this.db = this.client.db(dbName);
    console.log('Connected to MongoDB:', dbName);
    return this.client;
  }

  static getDb() {
    if (!this.db) throw new Error('MongoDB not connected!');
    return this.db;
  }

  static async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}

module.exports = MongoDB;
