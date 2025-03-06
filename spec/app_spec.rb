require 'rspec'
require 'rack/test'
require_relative '../app'

ENV['RACK_ENV'] = 'test'

RSpec.describe 'Blogging Platform API' do
    include Rack::Test::Methods

    def app
        Sinatra::Application
    end

    before(:each) do
        DB.exec("TRUNCATE posts, users RESTART IDENTITY CASCADE;")
    end

    describe 'Public Blog Routes' do
        it 'retrieves all blog posts' do
            DB.exec_params("INSERT INTO posts (title, content, author) VALUES ($1, $2, $3)",
                            ['Test Post', 'This is a test post', 'Admin'])
            
            get '/api/blog'
            expect(last_response.status).to eq(200)
            expect(JSON.parse(last_response.body).size).to eq(1)
        end

        it 'retrieves a single post' do
            DB.exec_params("INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING id",
                            ['Test Post', 'This is a test post', 'Admin'])
            post_id = DB.exec("SELECT id FROM posts LIMIT 1").first["id"]

            get "/api/blog/#{post_id}"
            expect(last_response.status).to eq(200)
            expect(JSON.parse(last_response.body)["title"]).to eq("Test Post")
        end

        it 'returns 404 for non-existent post' do
            get '/api/blog/99999'
            expect(last_response.status).to eq(404)
        end
    end

    describe 'Admin Authentication' do
        it 'registers an admin' do
            post '/auth/register', { username: 'admin', password: 'securepass' }
            expect(last_response.status).to eq(200)
            expect(JSON.parse(last_response.body)["success"]).to eq("Admin created")
        end

        it 'prevents registering multiple admins' do
            post '/auth/register', { username: 'admin', password: 'securepass' }
            post '/auth/register', { username: 'admin', password: 'securepass' }
            expect(last_response.status).to eq(403)
        end

        it 'logs in the admin' do
            DB.exec_params("INSERT INTO users (username, password) VALUES ($1, $2)",
                            ['admin', BCrypt::Password.create('securepass')])
            
            post '/auth/login', { username: 'admin', password: 'securepass' }
            expect(last_response.status).to eq(200)
            expect(JSON.parse(last_response.body)).to have_key("token")
        end

        it 'rejects invalid login' do
            post '/auth/login', { username: 'admin', password: 'wrongpass' }
            expect(last_response.status).to eq(401)
        end
    end

    describe 'Admin Blog Routes (Protected)' do
        let(:admin_token) do
            post '/auth/register', { username: 'admin', password: 'securepass' }
            post '/auth/login', { username: 'admin', password: 'securepass' }
            JSON.parse(last_response.body)["token"]
        end

        it 'creates a blog post' do
            header 'Authorization', "Bearer #{admin_token}"
            post '/api/blog', { title: 'New Post', content: 'Some content' }
            expect(last_response.status).to eq(200)
        end

        it 'rejects blog post creation without auth' do
            post '/api/blog', { title: 'New Post', content: 'Some content' }
            expect(last_response.status).to eq(401)
        end

        it 'deletes a blog post' do
            header 'Authorization', "Bearer #{admin_token}"
            DB.exec_params("INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING id",
                            ['Test Post', 'This is a test post', 'Admin'])
            post_id = DB.exec("SELECT id FROM posts LIMIT 1").first["id"]
            
            delete "/api/blog/#{post_id}"
            expect(last_response.status).to eq(200)
        end

        it 'rejects deleting non-existing post' do
            header 'Authorization', "Bearer #{admin_token}"
            delete "/api/blog/99999"
            expect(last_response.status).to eq(404)
        end
    end
end

# you need to test this: rspec spec/app_spec.rb