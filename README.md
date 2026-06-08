# React TypeScript CRUD Application

A scalable CRUD (Create, Read, Update, Delete) application built using React, TypeScript, and Vite. The project follows a modular architecture with reusable components, custom hooks, service layer separation, and maintainable folder organization.

## Features

- Create, Edit, Delete, and View records
- React Functional Components with Hooks
- TypeScript for type safety
- Reusable UI Components
- Form Validation
- Responsive User Interface
- Confirmation modal before delete actions
- Service layer for backend API integration (Axios)
- Scalable folder architecture
- ESLint and Prettier support
- JWT Authentication using HttpOnly Cookies (secure, not accessible by JavaScript)
- Toast notifications for user feedback

## Authentication

Token-based authentication using **HttpOnly Cookies** (not localStorage).

| Method        | Detail                                                                   |
| ------------- | ------------------------------------------------------------------------ |
| Login         | `POST /api/login` — backend sets a JWT token as an HttpOnly cookie       |
| Verify        | `GET /api/verify` — checks if an existing cookie is still valid          |
| Token storage | HttpOnly cookie (browser-managed, JS cannot read it)                     |
| Token refresh | Only when cookie is missing or expired — skips re-login on every refresh |

**Why HttpOnly Cookie instead of localStorage?**

- `localStorage` is accessible by any JavaScript on the page — vulnerable to XSS attacks
- HttpOnly cookies are invisible to JavaScript — even malicious scripts cannot steal the token
- Browser sends the cookie automatically on every request (`withCredentials: true`)

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite

### State Management

- React Hooks
- Custom Hooks

### HTTP Client

- Axios (with `withCredentials: true` for cookie support)

### Notifications

- React Toastify

### Styling

- CSS3

### Development Tools

- ESLint
- Prettier
- Vitest (unit testing)
- @testing-library/react

### Backend Integration

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

## Project Structure

```
src/
│
├── app/
│   └── App.tsx              # Root component — renders MainApp after auth completes
│
├── assets/                  # Images, icons and static assets
│
├── components/
│   ├── ConfirmModal/        # Reusable confirmation modal
│   ├── Form/
│   │   └── Form.tsx         # Registration form component
│   ├── Table/               # Data table component
│   ├── UI/                  # Reusable UI elements (Button, Input, Select)
│   └── index.ts             # Barrel exports
│
├── constants/               # Application constants and messages
│
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts           # Authentication — verifies cookie, triggers login if needed
│   ├── useApiData.ts        # Generic CRUD hook for backend API calls
│   ├── useUsers.ts          # User data and edit/delete state management
│   └── useUserForm.ts       # Form state, validation and submit logic
│
├── services/                # API service layer
│   ├── api.ts               # Axios instance (baseURL, timeout, withCredentials)
│   └── authService.ts       # verifyToken and getToken calls
│
├── styles/                  # Global and component styles
│
├── test/                    # Vitest unit test files
│
├── types/                   # TypeScript interfaces and types
│
├── utils/                   # Utility/helper functions (validation)
│
└── main.tsx                 # Application entry point
```

## Getting Started

### Navigate to Project

```
cd frontend
```

### Install Dependencies

```
npm install
```

### Environment Variables

Create a `.env` file in the `frontend/` folder:

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_EMAIL_TO_GENERATE_TOKEN=your@email.com
```

### Start Development Server

```
npm run dev
```

Application runs on: `http://localhost:5173`

### Build Production Bundle

```
npm run build
```

### Run ESLint

```
npm run lint
```

### Run Tests

```
npm test
```

## Application Architecture

```
React Frontend (localhost:5173)
│
├── useAuth        → GET /api/verify   (check cookie)
│                  → POST /api/login   (if cookie missing)
│
├── useApiData     → GET    /api/users
│                  → POST   /api/users
│                  → PUT    /api/users/:id
│                  → DELETE /api/users/:id
│
▼
Axios (withCredentials: true — browser sends HttpOnly cookie automatically)
│
▼
Node.js / Express API (localhost:3000)
│
▼
Sequelize ORM
│
▼
PostgreSQL Database
```
## Application Preview

![Application Home Screen](./screenshots/applicationScreenshot.png)