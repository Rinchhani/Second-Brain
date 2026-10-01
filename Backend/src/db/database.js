const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'second_brain.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ── Schema ──────────────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS ideas (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT,
    category    TEXT NOT NULL DEFAULT 'PERSONAL',
    tags        TEXT NOT NULL DEFAULT '[]',
    created_at  TEXT NOT NULL,
    bookmarked  INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS habits (
    id               TEXT PRIMARY KEY,
    title            TEXT NOT NULL,
    target_info      TEXT,
    completed_today  INTEGER NOT NULL DEFAULT 0,
    history          TEXT NOT NULL DEFAULT '[false,false,false,false,false,false,false]',
    streak_count     INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS books (
    id           TEXT PRIMARY KEY,
    title        TEXT NOT NULL,
    author       TEXT,
    cover_url    TEXT,
    current_page INTEGER NOT NULL DEFAULT 0,
    total_pages  INTEGER NOT NULL DEFAULT 1,
    tags         TEXT NOT NULL DEFAULT '[]'
  );

  CREATE TABLE IF NOT EXISTS insights (
    id           TEXT PRIMARY KEY,
    vault_number INTEGER NOT NULL,
    quote        TEXT NOT NULL,
    tags         TEXT NOT NULL DEFAULT '[]',
    bookmarked   INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS decision_vectors (
    id   TEXT PRIMARY KEY,
    type TEXT NOT NULL CHECK(type IN ('positive','negative')),
    text TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS synapses (
    id         TEXT PRIMARY KEY,
    title      TEXT NOT NULL,
    time_label TEXT NOT NULL,
    category   TEXT DEFAULT 'Note',
    created_at TEXT NOT NULL
  );
`);

module.exports = db;
