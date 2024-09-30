# Blogging Platform

A full-stack blogging platform built using React, Node.js, Express, and PostgreSQL, designed to integrate seamlessly into my portfolio. This platform will serve as a place to document my coding journey and demonstrate my expertise in web development, with an emphasis on scalable architecture and efficient data management.

## Features
- Create, edit, and delete blog posts
- Secure authentication for managing blog content
- Public-facing interface to view posts
- Pagination and search for blog posts (coming soon)
- Rich text editor for creating content (planned)

## Tech Stack
### Frontend:
- **React** with **TypeScript** for the user interface
- **React Router** for navigation
- **Axios** for API requests

### Backend:
- **Node.js** and **Express** for the server-side API
- **Sequelize** ORM with **PostgreSQL** for data management
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

## Future Enhancements
- Implement blog analytics for tracking post engagement
- Add user comment functionality
- Improve SEO and metadata management for blog posts
