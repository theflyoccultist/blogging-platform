require 'sinatra'
require 'rack/attack"
require './app'

run Sinatra::Application
use Rack::Attack