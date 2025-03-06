# Blogging Platform

A full-stack blogging platform built using React, Sinatra and PostgreSQL, designed to integrate seamlessly into my portfolio. This platform will serve as a place to document my coding journey and demonstrate my expertise in software development, with an emphasis on scalable architecture and efficient data management.

## Features
- Create, edit, and delete blog posts
- Secure authentication for managing blog content
- Public-facing interface to view posts
- Pagination for blog posts
- Simple markdown editor for creating content

## Tech Stack
### Frontend:
- **React** with **TypeScript** for the user interface
- **React Router** for navigation
- **Axios** for API requests

### Backend:
- **Ruby** with **Sinatra** for the server-side API
- **Raw SQL Queries** to **PostgreSQL** for data management
- **JWT Authentication** for securing admin routes
- **CORS** and **Helmet** for enhanced security

## Setup Instructions

### Backend
1. Install dependencies:
    ```bash
    cd backend
    npm install
    ```
2. Create a `.env` file in the `backend` directory with the following variables:
    ```env
    DATABASE_URL=your_postgres_connection_url
    JWT_SECRET=your_jwt_secret
    ```
3. Run database migrations:
    ```bash
    npx sequelize db:migrate
    ```
4. Start the backend server:
    ```bash
    npm run dev
    ```

### Frontend
1. Install dependencies:
    ```bash
    cd frontend
    npm install
    ```
2. Start the frontend development server:
    ```bash
    npm start
    ```
