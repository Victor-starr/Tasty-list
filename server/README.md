# TastyList Backend Documentation

The backend of **TastyList** is built with **Node.js**, **Express**, and **MongoDB**. It provides a robust API for managing recipes, user authentication, and other core functionalities. The backend is designed to be secure, scalable, and easy to integrate with the frontend.

## Navigation

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [How It Works](#how-it-works)
- [API Endpoints](#api-endpoints)
- [Application Structure](#application-structure)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)

## Overview

The backend serves as the backbone of the **TastyList** application, handling user authentication, recipe management, and database interactions. It exposes a RESTful API for the frontend to interact with, ensuring a seamless user experience.

## Features

### Authentication

- **Register**: Allows new users to create an account.
- **Login**: Authenticates users and provides a secure session.
- **Logout**: Clears the user's session.
- **Session Validation**: Verifies if a user is logged in.

### Recipe Management

- **Create**: Authenticated users can add new recipes.
- **Read**: Fetch all recipes, a single recipe, or the latest three recipes.
- **Update**: Authenticated users can edit their own recipes.
- **Delete**: Authenticated users can delete their own recipes.
- **Recommend**: Users can recommend recipes they like.
- **Unrecommend**: Users can remove their recommendations.
- **Favorites**: Users can view and manage their recommended recipes.

### Search

- Search recipes by title, description, or ingredients using a full-text search.

### Error Handling

- Centralized error handling for consistent API responses.
- Validation for user input and database operations.
- Validate image URLs to ensure they load correctly. Display a fallback UI for broken images.

## Technologies Used

### Node.js

- JavaScript runtime for building scalable server-side applications.

### Express

- Web framework for creating RESTful APIs.

### MongoDB

- NoSQL database for storing user and recipe data.

### Mongoose

- ODM (Object Data Modeling) library for MongoDB.

### JWT (JSON Web Tokens)

- Secure user authentication and session management.

### bcrypt

- Password hashing for secure storage.

## How It Works

### Authentication

- Users register with a username, email, and password.
- Passwords are hashed using **bcrypt** before being stored in the database.
- Upon login, a **JWT** is issued and stored in a cookie for session management.

### Recipe Management

- Recipes are stored in a MongoDB collection.
- Users can only edit or delete recipes they own.
- Recommendations are stored as an array of user IDs in each recipe document.
- Favorites: Users can view and manage their recommended recipes.

### Search

- Recipes are indexed for full-text search on fields like title, description, and ingredients.

### Error Handling

- Errors are caught and formatted using a centralized error handler.
- Validation errors, authentication errors, and database errors are handled gracefully.

## API Endpoints

### Authentication

| Method | Endpoint         | Description               | Protected |
| ------ | ---------------- | ------------------------- | --------- |
| POST   | `/auth/register` | Register a new user       | No        |
| POST   | `/auth/login`    | Log in a user             | No        |
| POST   | `/auth/logout`   | Log out the current user  | Yes       |
| GET    | `/auth/check`    | Check user authentication | Yes       |

### Recipes

| Method | Endpoint                    | Description                       | Protected |
| ------ | --------------------------- | --------------------------------- | --------- |
| GET    | `/catalog`                  | Fetch all recipes                 | No        |
| GET    | `/catalog/last-three`       | Fetch the latest three recipes    | No        |
| GET    | `/catalog/:id`              | Fetch a single recipe by ID       | No        |
| POST   | `/catalog/create`           | Create a new recipe               | Yes       |
| PUT    | `/catalog/:id`              | Update a recipe                   | Yes       |
| DELETE | `/catalog/:id`              | Delete a recipe                   | Yes       |
| PUT    | `/catalog/:id/recommend`    | Recommend a recipe                | Yes       |
| PUT    | `/catalog/:id/unrecommend`  | Unrecommend a recipe              | Yes       |
| GET    | `/catalog/favorites`        | Fetch all recommended recipes     | Yes       |
| GET    | `/catalog/search/:query`    | Search recipes by query           | No        |
| GET    | `/catalog/user-recipes`     | fetch user recipes                | Yes       |
| GET    | `/catalog/user-recom-count` | fetch user recipes recommendation | Yes       |

## Application Structure

### Controllers

- **authController**: Handles user authentication (register, login, logout, session validation).
- **catalogController**: Manages recipe-related operations (CRUD, search, recommendations).

### Services

- **authServices**: Contains business logic for authentication.
- **recipeServices**: Contains business logic for recipe management.

### Models

- **User**: Defines the schema for user data.
- **Recipe**: Defines the schema for recipe data.

### Middlewares

- **authMiddleware**: Protects routes by checking user authentication.
- **errorHandler**: Formats and handles errors consistently.

## Getting Started

### Prerequisites

- Install **Node.js** and **npm**.
- Set up a **MongoDB** database.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Victor-starr/Softuni_React_Project.git
cd ./server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:

```env
PORT=5025
FRONTEND_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret_key
```

4. Start the development server:

```bash
npm run dev
```

5. The server will run at [http://localhost:5025](http://localhost:5025).

## Folder Structure

```
server/
├── src/
│   ├── controllers/       # Route handlers
│   ├── middlewares/       # Middleware functions
│   ├── models/            # Mongoose schemas
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   ├── types.ts           # TypeScript type definitions
│   ├── index.ts           # Entry point of the application
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── README.md              # Documentation
```

This documentation provides a comprehensive overview of the TastyList backend, its features, and how to get started. It is designed to help developers understand and contribute to the project effectively.
