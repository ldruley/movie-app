import * as SQLite from 'expo-sqlite';

export const initDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("myDatabase.db");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE
      );
    `);
    return 'Table created successfully';
  } catch (error) {
    throw error;
  }
};

// Insert a user
export const insertUser = async (name, email) => {
  try {
    const db = await SQLite.openDatabaseAsync("myDatabase.db");
    const result = await db.runAsync(
      `INSERT INTO users (name, email) VALUES (?, ?);`,
      [name, email]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Fetch all users
export const getUsers = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("myDatabase.db");
    const result = await db.getAllAsync(`SELECT * FROM users;`);
    return result;
  } catch (error) {
    throw error;
  }
};
