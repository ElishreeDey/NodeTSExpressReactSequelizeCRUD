# Node Express TypeScript Sequelize CRUD API

A backend CRUD application built using Node.js, Express.js, TypeScript, Sequelize ORM, PostgreSQL and JWT Authentication.

This project follows a Controller → Service → Repository architecture to keep code scalable, reusable and easy to maintain.

# Project Purpose

- Controller → Service → Repository Architecture
- Sequelize ORM + PostgreSQL
- JWT Authentication
- Auth Middleware
- Global Error Middleware
- Helmet Security
- API Rate Limiting
- Restricted CORS Policy
- Clean Folder Structure
- TypeScript Type Safety

# Tech Stack

Backend Technologies:

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Helmet
- CORS
- Express Rate Limit
- Dotenv

# Project Request Flow

Client / Postman
↓
Routes
↓
Middleware
↓
Controller
↓
Service Layer
↓
Repository Layer
↓
Model
↓
PostgreSQL Database

Each layer has its own responsibility.

# Folder Structure

src
│
├── config
├── constants
├── controllers
├── helpers
├── middleware
├── models
├── repositories
├── routes
├── services
├── types
└── index.ts

## Install Packages

npm install

## Update .env

Update:

- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME

# Security Middleware

This project uses multiple middleware layers for API security.

## Helmet

Helmet adds secure HTTP headers to protect the Express application.

Used for:

- Security headers
- Clickjacking protection
- MIME type protection
- Browser security hardening

## JWT Authentication

JWT is used to secure protected APIs.

Flow:

Login API  
↓  
Generate Token  
↓  
Pass Token in Authorization Header  
↓  
Protected API Access

Header Format:
Authorization: Bearer YOUR_TOKEN

## Rate Limiter

API Rate Limiting is implemented using **express-rate-limit**.

Purpose:

- Prevent API abuse
- Reduce spam requests
- Protect login and APIs from brute-force attacks

Example:
15 Minutes Window
Max Requests = Configurable via .env
If limit exceeded:
{
"message": "Too many requests. Please try again later."
}

Middleware: rateLimitMiddleware.ts

## CORS Restriction

CORS policy is configured to allow only approved frontend applications.

Instead of allowing all origins the API allows requests only from CLIENT_URL

Example:
CLIENT_URL=http://localhost:5173

Purpose:

- Restrict unauthorized frontend access
- Improve API security
- Production-safe API communication

Note:
Postman testing is not affected by browser CORS rules.

# Install Packages

npm install

## Run Development Server

npm run dev

## Build Project

npm run build

## Start Production Server

npm start

## API Endpoints

POST
http://localhost:3000/api/login
body should have a email based on which JWT encripted token will be generated
e.g: "email":"elishree@test.com"

POST
http://localhost:3000/api/users
Use the above Auth Token generated in login with Json body as input in Postman.

GET
http://localhost:3000/api/users
Use the above Auth Token generated in login.

GET
http://localhost:3000/api/users/1
Use the above Auth Token generated in login.

PUT
http://localhost:3000/api/users/1
Use the above Auth Token generated in login with Json body as input in Postman.

DELETE
http://localhost:3000/api/users/1
Use the above Auth Token generated in login.
