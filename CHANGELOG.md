# Changelog

## [2.1] - 2025-05-07
- **Works in Docker Containers with Redis. There are only minor cosmetic updates and fixes to do.**

## [2.0] - 2025-03-06
- **Express backend gone, time for Sinatra**
  - Instead of navigating between 40 express files and relying on dependencies that might break anytime, I chose to use something easier to manage for a solo dev like me.

### To do
  - Soon, React will be eradicated as well.

## [1.4.0] - 2025-02-17
### Fixed
- **No longer using React Quill:**
  - I figured out it was just better to use a markdown editor instead of dealing with this overengineered text editor. What kind of programmer wants a Rich Text Editor when we just want to be writing markdown? A simple text dialog implementation will never cause torment and harm to the developer either.
- **Refresh token issues fixed**
  - A very simple way to fix this issue: make the refresh token longer. It's less secure but logging out still works like before.

### Final thoughts
- **Final Version**
  - This is the final version of this blog platform. I am constantly fixing bugs every time I attempt to add a feature into this bloated mess, and I am saving my mental health by considering it finished. This means that there are many abandonned features that has been pushed into the black hole by git reverts, but it is better like this and move on to more exciting projects.

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
