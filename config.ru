# frozen_string_literal: true

require 'rack'
require 'sinatra'
require 'dotenv/load'
require 'base64'
require './app'
require './rate_limiter'

run MyApp

same_site = ENV['RACK_ENV'] == 'production' ? :none : :lax
secure = ENV['RACK_ENV'] == 'production'
decoded_secret = Base64.decode64(ENV['SSC'])

use Rack::Session::Cookie,
    key: 'rack.session',
    path: '/',
    expire_after: 14_400,
    same_site: same_site,
    secure: secure,
    secret: decoded_secret

use RateLimiter, limit: 100, period: 60
