# frozen_string_literal: true

require 'sinatra'
require './app'

run Sinatra::Application

use Rack::Session::Cookie,
    key: 'rack.Session',
    path: '/',
    same_site: :none,
    secure: false, # do true for deploy
    secret: ENV['SSC']
