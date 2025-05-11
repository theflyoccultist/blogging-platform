# frozen_string_literal: true

require_relative '../lib/helpers'

# Routes and logic for users
class UserRoutes < Sinatra::Base
  helpers Helpers

  enable :sessions
  set :views, File.expand_path('../public/views', __dir__)

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
      puts "[DEBUG] Session after login: #{session.inspect}"
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
    redirect '/login'
  end

  before %r{/} do
    redirect '/login' unless logged_in?
  end
end
