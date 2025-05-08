# frozen_string_literal: true

require 'sinatra/base'
require 'dotenv/load'
require 'sqlite3'
require 'bcrypt'

require_relative 'routes/users'
require_relative 'routes/articles'

# Database connection
begin
  db = SQLite3::Database.new 'data/post.db'
  db.results_as_hash = true
rescue SQLite3::Exception => e
  halt 500
  puts "SQLite says: #{e.message}"
end

# Initialize Database tables
db.execute <<~SQL
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

db.execute <<~SQL
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    )
SQL

# Routes and logic
class MyApp < Sinatra::Base
  use UserRoutes
  use ArticleRoutes
end

set :public_folder, File.join(__dir__, 'public')

set :environment, :production
set :port, ENV.fetch('PORT', 8080)
set :bind, '0.0.0.0'
