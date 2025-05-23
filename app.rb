# frozen_string_literal: true

require 'sinatra/base'
require 'dotenv/load'
require 'bcrypt'

require_relative 'routes/users'
require_relative 'routes/articles'
require_relative 'lib/db_setup'

# Routes and logic
class MyApp < Sinatra::Base
  use UserRoutes
  use ArticleRoutes
end

set :static, true
set :public_folder, File.join(__dir__, 'public')
