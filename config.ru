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
    same_site: :lax,
    secure: production?,
    secret: ENV['SSC']
