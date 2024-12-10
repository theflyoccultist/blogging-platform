# Changelog

## [1.3.0] - 2024-12-10
### Added
- **Thumbnail Support:** Introduced a "thumbnail" column in the database and an input field for image links. Adding a thumbnail is now optional.
- **React Quill Editor Rework:** 
  - The code block module now supports syntax highlighting for TypeScript, JavaScript, Bash, Python, and Rust.
  - Previously added code blocks default to TypeScript highlighting.
- **Pagination:** Added pagination to the blogging platform, displaying 10 articles per page.

### Fixed
- **Idle Timeout Issue:** Resolved a 401 error that occurred when making API calls from PostEdit and PostCreate after more than 10 minutes of inactivity.
- **Form Input Limits:** Set a character input limit of 30 for the login and register forms.
- **Code Button Visibility:** Fixed a bug where the code button in PostEdit was clickable but not visible.

### Todo
- **Tag Manager:** Work has started, but backend changes are still pending.
- **Private/Public Post Handling:** Plan to enable saving posts as private and later making them public.

## [1.2.0] - 2024-11.28
### Added
- Lazy loading for the blogging platform.
- Token refreshing for improved authentication security: it runs every ten minutes in the background while you are authenticated.
- Ability to log out securely from the platform: once logged out, when attempting to press the back button, you will be redirected to the `/login` page because your token will be removed.

## [1.1.0] - 2024-11-23
### Added
- Ability to create code blocks when creating a post.
- Ability to embed links when creating or editing a post.
- User authentication for blog post management.
- Rate-limiting middleware for improved API security.
- HTML sanitization for fetched blog posts.

## [1.0.0] - 2024-11-18
### Added
- Initial deployment of the Node.js backend API.
- Initial deployment of the React + TypeScript + Vite frontend.