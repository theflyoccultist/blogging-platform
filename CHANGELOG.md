# Changelog

## [1.2.0] - 2024-11.28
### Added
- Lazy loading for the blogging platform.
- Token refreshing for improved authentication security: it runs every ten minutes in the background while you are authenticated.
- Ability to log out securely from the platform: once logged out, when attempting to press the back button, you will be redirected to the `/login` page because your token will be removed.

## [1.1.0] - 2024-11-23
### Added
- Ability to create code blocks when creating a post.
- Ability to embed links and images when creating or editing a post.
- User authentication for blog post management.
- Rate-limiting middleware for improved API security.
- HTML sanitization for fetched blog posts.

## [1.0.0] - 2024-11-18
### Added
- Initial deployment of the Node.js backend API.
- Initial deployment of the React + TypeScript + Vite frontend.