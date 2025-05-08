# frozen_string_literal: true

require_relative './db'

# it will help.
module Helpers
  def db
    DB.connection
  end

  # Helper to render views with or without layout based on HTMX requests.
  def smart_template(view)
    if request.env['HTTP_HX_REQUEST'] == 'true'
      erb view.to_sym, layout: false
    else
      erb view.to_sym
    end
  end

  # Helper for page redirection
  def hx_redirect
    response.headers['HX-Redirect'] = '/'
    status 200
  end

  # deny access to unauthenticated users
  def logged_in?
    session[:user_id] != nil
  end
end
