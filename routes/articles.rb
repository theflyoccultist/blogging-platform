# frozen_string_literal: true

require_relative '../lib/helpers'

# Logic for blog post articles and API
class ArticleRoutes < Sinatra::Base
  helpers Helpers

  set :views, File.expand_path('../public/views', __dir__)

  before do
    pass if request.path_info =~ /\.(css|js|woff2)$/
    redirect '/login' unless logged_in?
  end

  get '/' do
    page = params[:page].to_i
    page = 1 if page < 1
    limit = 10
    offset = (page - 1) * limit

    @posts = db.execute("SELECT * FROM posts ORDER BY created_at
      DESC LIMIT ? OFFSET ?", [limit, offset])
    @total_posts = db.get_first_value('SELECT COUNT(*) FROM POSTS')
    @current_page = page
    smart_template(:index)
  end

  get '/article' do
    @posts = nil # blank state for new article
    smart_template(:article)
  end

  get '/article/:id' do
    result = db.execute(
      "SELECT * FROM posts
        WHERE id = ? LIMIT 1", [params[:id]]
    )

    @post = result.first
    halt 404, 'Post not found' unless @post

    smart_template(:article)
  end

  # 10 posts per page
  get '/api' do
    cursor = params[:cursor] || Time.now.iso8601
    db.execute(
      "SELECT id, title, thumbnail, created_at, content, is_public
        FROM posts
        WHERE created_at < ?
        ORDER BY created_at DESC
        LIMIT 10;",
      [cursor]
    ).map(&:to_h).to_json
  end

  post '/api' do
    is_public = params[:is_public] == 'true' ? 1 : 0

    db.execute(
      "INSERT INTO posts (title, thumbnail, content, author, is_public)
      VALUES (?, ?, ?, ?, ?)",
      [params[:title], params[:thumbnail], params[:content], params[:author], is_public]
    )

    hx_redirect
  end

  put '/api/:id' do
    is_public = params[:is_public] == 'true' ? 1 : 0

    db.execute(
      "UPDATE posts
          SET title = ?, thumbnail = ?, content = ?, author = ?, is_public = ?
        WHERE id = ?",
      [params[:title], params[:thumbnail], params[:content], params[:author],
       is_public, params[:id]]
    )

    hx_redirect
  end

  delete '/api/:id' do
    db.execute(
      'DELETE FROM posts WHERE id = ?',
      [params[:id].to_i]
    )

    hx_redirect
  end
end
