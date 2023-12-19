// database.js

const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";
class Database {
  constructor() {
    if (!Database.instance) {
      this._db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
          console.error(err.message);
          throw err;
        } else {
          console.log("Connected to the SQLite database.");
          this._db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            company TEXT, 
            email TEXT UNIQUE, 
            password TEXT
          )`);
        }
      });

      Database.instance = this;
    }

    return Database.instance;
  }

  get connection() {
    return this._db;
  }
}

module.exports = new Database().connection;
