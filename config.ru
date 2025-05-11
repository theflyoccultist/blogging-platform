# frozen_string_literal: true

require 'rack'
require 'sinatra'
require 'dotenv/load'
require './app'
require './rate_limiter'

use RateLimiter, limit: 100, period: 60
run MyApp

def production?
  ENV['RACK_ENV'] == 'production'
end

use Rack::Session::Cookie,
    key: 'rack.session',
    path: '/',
    expire_after: 14_400,
<<<<<<< HEAD
    same_site: :lax,
    secure: production?,
=======
    same_site: :none,
    secure: true,
>>>>>>> c2c5933 (delete problematic route)
    secret: ENV['SSC']
