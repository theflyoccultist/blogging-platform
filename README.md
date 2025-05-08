# Blogging Platform

A server side rendered blogging platform using Ruby, HTMX and SQLite3, designed to edit my own article entries before it's seamlessly integrated with my portfolio. This platform will serve as a place to document my coding journey and demonstrate my expertise in software development.

![Index Thumbnail](public/assets/index-page.png)

## Features
- Create, edit, and delete blog posts
- View blog posts and setup their status (Draft: Private, Published: Public)
- Simple markdown editor for creating content
- Secure authentication
- Fabulous Windows 98 aesthetic
- Rate Limiting with Redis

## Upcoming
- A live markdown previewer (for the article editor)
- Pagination to display more than 10 articles

## Tech Stack

- **Ruby** with **Sinatra** for the server-side API
- **Persistent storage with SQLite3**
- **ERB Templates** with **HTMX** (it's included in the repository)

## Setup Instructions

- Setup Docker compose
```bash
docker compose up --build
```

- Access the provided URL
