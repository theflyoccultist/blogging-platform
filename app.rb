# frozen_string_literal: true

require 'sinatra'
require 'dotenv/load'
require 'sqlite3'
require 'bcrypt'

enable :sessions

# Database connection
begin
  db = SQLite3::Database.new 'data/post.db'
  db.results_as_hash = true
rescue SQLite3::Exception => e
  halt 500
  puts "SQLite says: #{e.message}"
end

helpers do
  # Helper to render views with or without layout based on HTMX requests.
  def smart_template(view)
    if request.env['HTTP_HX_REQUEST'] == 'true'
      erb view.to_sym, layout: false
    else
      erb view.to_sym
    end
  end

  # Helper for page redirection
  def hx_redirect
    response.headers['HX-Redirect'] = '/'
    status 200
  end

  def logged_in?
    !!session[:user_id]
  end
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

get '/login' do
  smart_template(:login)
end

get '/register' do
  smart_template(:register)
end

post '/login' do
  user = db.execute("SELECT * FROM users
    WHERE username = ?", [params[:username]]).first

  if user && BCrypt::Password.new(user['password']) == params[:password]
    session[:user_id] = user['id']
    redirect '/'
  else
    @error = true
    smart_template(:login)
  end
end

post '/register' do
  existing_user = db.execute('SELECT 1 FROM users LIMIT 1').first

  if existing_user
    halt 403, 'User have already been created'
  else
    hashed_password = BCrypt::Password.create(params[:password]).to_s

    db.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)', [params[:username], hashed_password]
    )
    redirect '/'
  end
end

delete '/logout' do
  session.clear
  smart_template(:login)
end

before %r{/(?!login|register|api|denied).*} do
  halt 403, smart_template(:denied) unless logged_in?
end

get '/' do
  result = db.execute("SELECT * FROM posts
      ORDER BY created_at DESC")
  @posts = result

  smart_template(:index)
end

get '/article' do
  @posts = nil # blank state for new article
  smart_template(:article)
end

get '/article/:id' do
  result = db.execute(
    "SELECT * FROM posts
        WHERE id = ? LIMIT 1", [params[:id]]
  )

  @post = result.first
  halt 404, 'Post not found' unless @post

  smart_template(:article)
end

# 10 posts per page
get '/api' do
  cursor = params[:cursor] || Time.now.iso8601
  db.execute(
    "SELECT id, title, thumbnail, created_at, content, is_public
        FROM posts
        WHERE created_at < ?
        ORDER BY created_at DESC
        LIMIT 10;",
    [cursor]
  ).map(&:to_h).to_json
end

post '/api' do
  is_public = params[:is_public] == 'true' ? 1 : 0

  db.execute(
    "INSERT INTO posts (title, thumbnail, content, author, is_public)
      VALUES (?, ?, ?, ?, ?)",
    [params[:title], params[:thumbnail], params[:content], params[:author], is_public]
  )

  hx_redirect
end

put '/api/:id' do
  is_public = params[:is_public] == 'true' ? 1 : 0

  db.execute(
    "UPDATE posts
          SET title = ?, thumbnail = ?, content = ?, author = ?, is_public = ?
        WHERE id = ?",
    [params[:title], params[:thumbnail], params[:content], params[:author],
     is_public, params[:id]]
  )

  hx_redirect
end

delete '/api/:id' do
  db.execute(
    'DELETE FROM posts WHERE id = ?',
    [params[:id].to_i]
  )

  hx_redirect
end

set :public_folder, File.join(__dir__, 'public')
set :views, File.join(settings.public_folder, 'views')

set :environment, :production
set :port, ENV.fetch('PORT', 8080)
set :bind, '0.0.0.0'
