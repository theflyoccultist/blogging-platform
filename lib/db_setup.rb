# frozen_string_literal: true

require_relative './db'

# Initialize Database tables
DB.connection.execute <<~SQL
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    thumbnail TEXT,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_public BOOLEAN DEFAULT 0
    )
SQL

DB.connection.execute <<~SQL
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    )
SQL
