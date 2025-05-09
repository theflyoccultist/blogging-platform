# frozen_string_literal: true

require 'rack'
require 'sinatra'
require './app'
require './rate_limiter'

use RateLimiter, limit: 100, period: 60

run MyApp

use Rack::Session::Cookie,
    key: 'rack.Session',
    path: '/',
    expire_after: 14_400,
    same_site: :none,
    secure: true, # do true for deploy
    secret: ENV['SSC']
