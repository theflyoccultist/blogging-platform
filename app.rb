# frozen_string_literal: true

require 'sinatra'
require 'dotenv/load'
require 'pg'
require 'bcrypt'

enable :sessions

# Database connection
conn = PG.connect(ENV['DATABASE_URL'])

helpers do
  # Error handling for PostgreSQL Queries
  def db_safe
    yield
  rescue PG::Error => e
    halt 500
    puts "💀 PostgreSQL says: #{e.message}"
  end

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
conn.exec_params(
  "CREATE TABLE IF NOT EXISTS blogging_schema.posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    thumbnail TEXT,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    is_public BOOLEAN DEFAULT FALSE
    );"
)

conn.exec_params(
  "CREATE TABLE IF NOT EXISTS blogging_schema.users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    );"
)

get '/login' do
  smart_template(:login)
end

get '/register' do
  smart_template(:register)
end

post '/login' do
  user = db_safe do
    conn.exec_params("SELECT * FROM blogging_schema.users
    WHERE username = $1", [params[:username]]).first
  end

  if user && BCrypt::Password.new(user['password']) == params[:password]
    session[:user_id] = user['id']
    redirect '/'
  else
    @error = true
    smart_template(:login)
  end
end

post '/register' do
  existing_user = db_safe do
    conn.exec_params("SELECT * FROM blogging_schema.users
    LIMIT 1").first
  end

  if existing_user
    halt 403, 'User have already been created'
  else
    hashed_password = BCrypt::Password.create(params[:password]).to_s

    conn.exec_params(
      "INSERT INTO blogging_schema.users (username, password)
       VALUES ($1, $2)", [params[:username], hashed_password]
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
  result = db_safe do
    conn.exec_params("SELECT * FROM blogging_schema.posts
      ORDER BY created_at DESC")
  end
  @posts = result.map do |row|
    row['is_public'] = row['is_public'] == 't' # pg returns 't'/'f' as strings
    row
  end

  smart_template(:index)
end

get '/article' do
  @posts = nil # blank state for new article
  smart_template(:article)
end

get '/article/:id' do
  result = db_safe do
    conn.exec_params(
      "SELECT * FROM blogging_schema.posts
        WHERE id = $1 LIMIT 1", [params[:id]]
    )
  end

  @post = result.first
  halt 404, 'Post not found' unless @post

  smart_template(:article)
end

# 10 posts per page
get '/api' do
  db_safe do
    cursor = params[:cursor] || Time.now.iso8601
    conn.exec_params(
      "SELECT id, title, thumbnail, created_at, content, is_public
        FROM blogging_schema.posts
        WHERE created_at < $1
        ORDER BY created_at DESC
        LIMIT 10;",
      [cursor]
    ).map(&:to_h).to_json
  end
end

post '/api' do
  is_public = params[:is_public] == 'true'

  db_safe do
    conn.exec_params(
      "INSERT INTO blogging_schema.posts (title, thumbnail, content, author, is_public)
      VALUES ($1, $2, $3, $4, $5)",
      [params[:title], params[:thumbnail], params[:content], params[:author], is_public]
    )
  end

  hx_redirect
end

put '/api/:id' do
  is_public = params[:is_public] == 'true'

  db_safe do
    conn.exec_params(
      "UPDATE blogging_schema.posts
          SET title = $1, thumbnail = $2, content = $3, author = $4, is_public = $5
        WHERE id = $6",
      [params[:title], params[:thumbnail], params[:content], params[:author],
       is_public, params[:id]]
    )
  end

  hx_redirect
end

delete '/api/:id' do
  db_safe do
    conn.exec_params(
      'DELETE FROM blogging_schema.posts WHERE id = $1',
      [params[:id].to_i]
    )
  end

  hx_redirect
end

set :public_folder, File.join(__dir__, 'public')
set :views, File.join(settings.public_folder, 'views')

set :environment, :production
set :port, ENV.fetch('PORT', 8080)
set :bind, '0.0.0.0'
