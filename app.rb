# frozen_string_literal: true

require 'sinatra/base'
require 'dotenv/load'
require 'bcrypt'

require_relative 'routes/users'
require_relative 'routes/articles'
require_relative 'lib/db_setup'

# Routes and logic
class MyApp < Sinatra::Base
  configure do
    set :environment, ENV.fetch('RACK_ENV', 'development')
  end
  use UserRoutes
  use ArticleRoutes
end

set :public_folder, File.join(__dir__, 'public')

set :port, ENV.fetch('PORT', 8080)
set :bind, '0.0.0.0'
