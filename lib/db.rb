# frozen_string_literal: true

require 'sqlite3'

# Database connection
module DB
  def self.connection
    @connection ||= begin
      db = SQLite3::Database.new 'data/post.db'
      db.results_as_hash = true
      db
    end
  rescue SQLite3::Exception => e
    halt 500
    puts "SQLite says: #{e.message}"
  end
end
