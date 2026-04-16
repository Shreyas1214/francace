import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

let db;

function getDb() {
  if (!db) {
    const fullPath = path.join(/*turbopackIgnore: true*/ process.cwd(), 'data', 'francace.db');
    db = new Database(fullPath);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeDatabase(db);
  }
  return db;
}

function initializeDatabase(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT DEFAULT NULL,
      exam_type TEXT DEFAULT 'TEF',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      module TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      total INTEGER DEFAULT 0,
      data TEXT DEFAULT '{}',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, module)
    );

    CREATE TABLE IF NOT EXISTS user_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      streak INTEGER DEFAULT 0,
      total_minutes INTEGER DEFAULT 0,
      level TEXT DEFAULT 'A1',
      level_label TEXT DEFAULT 'Débutant',
      clb INTEGER DEFAULT 1,
      last_active_date TEXT DEFAULT NULL,
      exam_date TEXT DEFAULT NULL,
      daily_goal INTEGER DEFAULT 30,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS mock_exam_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      exam_type TEXT NOT NULL,
      listening_score INTEGER DEFAULT 0,
      reading_score INTEGER DEFAULT 0,
      writing_score INTEGER DEFAULT 0,
      speaking_score INTEGER DEFAULT 0,
      estimated_clb INTEGER DEFAULT 0,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS conversation_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      scenario_id TEXT NOT NULL,
      messages TEXT DEFAULT '[]',
      score INTEGER DEFAULT 0,
      feedback TEXT DEFAULT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

export default getDb;
