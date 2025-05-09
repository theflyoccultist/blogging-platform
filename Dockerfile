FROM ruby:3.3-alpine

RUN apk add --no-cache build-base sqlite sqlite-dev

WORKDIR /usr/src/app

ENV GEM_PATH=/usr/src/app/vendor/bundle/ruby/3.3.0
ENV PATH=$GEM_PATH/bin:$PATH

COPY Gemfile Gemfile.lock ./

RUN bundle config set --local path 'vendor/bundle' \
  && bundle install

COPY . .

ENV RACK_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["rackup", "--host", "0.0.0.0", "--port", "8080"]
