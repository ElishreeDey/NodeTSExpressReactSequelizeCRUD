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
- Service layer structure for future API integration
- Scalable folder architecture
- ESLint and Prettier support

## Tech Stack

### Frontend

- React
- TypeScript
- Vite

### State Management

- React Hooks
- Custom Hooks

### Styling

- CSS3

### Development Tools

- ESLint
- Prettier

### Backend Integration (Planned / In Progress)

- Axios
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

## Project Structure

src/
│
├── app/
│ └── App.tsx # Root application component
│
├── assets/ # Images, icons and static assets
│
├── components/
│ ├── ConfirmModal/ # Reusable confirmation modal
│ ├── Form/
│ │ └── Form.tsx # Registration form component
│ ├── Table/ # Data table component
│ ├── UI/ # Reusable UI elements
│ └── index.ts # Barrel exports
│
├── constants/ # Application constants and messages
│
├── hooks/ # Custom React hooks
│ ├── useLocalStorage.ts
│ └── useApiData.ts # Backend integration hook
│
├── services/ # Service layer / API logic
│
├── styles/ # Global and component styles
│
├── test/ # Test files
│
├── types/ # TypeScript interfaces and types
│
├── utils/ # Utility/helper functions
│
└── main.tsx # Application entry point

### Navigate to Project

cd frontend

### Install Dependencies

npm install

### Start Development Server

npm run dev

Application runs on:

http://localhost:5173

### Start Development Server

npm run dev

### Build Production Bundle

npm run build

### Run ESLint

npm run lint

### Format Code (If Configured)

npm run format

### Run Tests

npm test

## Backend Integration

The project structure has been prepared for backend integration using:

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

Planned architecture:

React Frontend
│
▼
Axios API Calls
│
▼
Node.js / Express API
│
▼
Sequelize ORM
│
▼
PostgreSQL Database

## Application Preview

![Application Home Screen](./screenshots/applicationScreenshot.png)
