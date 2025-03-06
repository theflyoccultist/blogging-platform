ENV['DATABASE_URL'] ||='postgres://runner:runner@localhost:5432/blogging'
require 'pg'

DB = PG.connect(ENV['DATABASE_URL'])