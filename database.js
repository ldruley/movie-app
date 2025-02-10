import * as SQLite from 'expo-sqlite';

export const initDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("myDatabase.db");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
      );
    `);
    console.log("Table created or already exists");
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Insert a user
export const insertUser = async (name, email, password) => {
  try {
    const db = await SQLite.openDatabaseAsync("myDatabase.db");
    const result = await db.runAsync(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?);`,
      [name, email, password]
    );
    console.log("User inserted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error while inserting user:", error);
    throw error;
  }
};

// Fetch all users
export const getUsers = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("myDatabase.db");
    const result = await db.getAllAsync(`SELECT * FROM users;`);
    console.log("Fetched users:", result);
    return result;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
