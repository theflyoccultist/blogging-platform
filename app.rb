require 'sinatra'
require 'sinatra/json'
require 'pg'
require 'jwt'
require 'bcrypt'
require 'rack-attack'
require 'dotenv/load'

# Database Connection
DB = PG.connect(dbname: 'blogging')

# CORS Config
configure do
    enable :cross_origin
end

before do
    response.headers['Access-Control-Allow-Origin'] = *
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
end

options '*' do
    200
end

# Initialize database Tables
DB.exec <<-SQL
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        thumbnail TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
SQL

DB.execute <<-SQL
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
SQL

SECRET_KEY = ENV['SECRET_KEY'] || raise("Missing SECRET_KEY in environment variables")

helpers do
    def authorized?
        auth_header = request.env["HTTP_AUTHORIZATION"]
        return false unless auth_header

        token = auth_header.split(" ").last
        begin
            payload, _header = JWT.decode(token, SECRET_KEY, true, algorithm: "HS256")
            return payload["role"] == "admin"
        rescue JWT::DecodeError
            return false
        end
    end

    def protected!
        halt 401, json(error: "Unauthorized") unless authorized?
    end
end

# PUBLIC ROUTES
get "/api/blog" do
    posts = DB.exec("SELECT * FROM posts ORDER BY created_at DESC").map { |row| row }
    json posts
end

get "/api/blog/:id" do
    post = DB.exec_params("SELECT * FROM posts WHERE id = $1", [params[:id].to_i]).first
    halt 404, json(error: "Not found") unless post
    json post
end

# RATE LIMITING MIDDLEWARE
Rack::Attack.cache.store = Rack::Attack::StoreProxy::RedisStoreProxy.new(Redis.new)

Rack::Attack.throttle('req/ip', limit: 5, period: 300) do |req|
    req.ip
end

# ADMIN ROUTES
post "/auth/register" do
    existing_admin = DB.exec("SELECT * FROM users LIMIT 1").first
    halt 403, json(error: "Admin already exists") if existing_admin

    password_digest = Bcrypt::Password.create(params[:password])
    DB.exec_params("INSERT INTO users (username, password) VALUES ($1, $2)", [params[:username], password_digest])
    json success: "Admin created"
end

post "/auth/login" do
    admin = DB.exec_params("SELECT * FROM users WHERE username = $1", [params[:username]]).first
    halt 401, json(error: "Unauthorized") unless admin && BCrypt::Password.new(admin[:password]) == params[:password]

    payload = { username: admin["username"], role: "admin", exp: Time.now.to_i + 3600 }
    token = JWT.encode(payload, SECRET_KEY, "HS256")
    json token: token
end

post "/auth/logout" do
    json success: "Logged out"
end

post "/auth/refresh" do
    # Implement refresh token logic
end

post "/api/blog" do
    protected!
    DB.exec_params("INSERT INTO posts (title, content, author, thumbnail) VALUES ($1, $2, $3, $4)",
                    [params[:title], params[:content], "Rinkakuworks", params[:thumbnail]])
    json success: "Post created"
end

put "/api/blog/:id" do
    protected!
    post = DB.exec_params("SELECT * FROM posts WHERE id = $1", [params[:id].to_i]).first
    halt 404, json(error: "Not found") unless post

    DB.exec_params("UPDATE posts SET title = $1, content = $2 WHERE id = $3",
                    [params[:title] || post["title"], params[:content] || post["content"], params[:id].to_i])
    
    json success: "Post updated"
end

delete "/api/blog/:id" do
    protected!
    result = DB.exec_params("DELETE FROM posts WHERE id = $1", [params[:id].to_i])
    halt 404, json(error: "Not found") if result.cmd_tuples == 0

    json success: "Post deleted"
end