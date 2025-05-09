# frozen_string_literal: true

require 'rack'
require 'sinatra'
require './app'
require './rate_limiter'

root_app = Rack::Builder.new do
  map '/' do
    run ->(env) { [200, { 'content-type' => 'text/plain' }, ['ok']] }
  end
end

app = Rack::Builder.new do
  use RateLimiter, limit: 100, period: 60

  use Rack::Session::Cookie,
      key: 'rack.Session',
      path: '/',
      expire_after: 14_400,
      same_site: :none,
      secure: true, # do true for deploy
      secret: ENV['SSC']

  map '/' do
    run root_app
  end

  run MyApp
end

run app
