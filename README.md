# TastyList Full Project Documentation

<img src="./assets/Banner.png" alt="TastyList Banner" width="100%"/>

TastyList is a modern web application designed for food enthusiasts to explore, create, and manage recipes. It provides a seamless experience for users to browse recipes, create their own, and interact with others through recommendations. Built with **React, TypeScript, Node.js, and MongoDB**, TastyList is a full-stack application that combines a responsive frontend with a robust backend.

---

## Navigation

- [Overview](#overview)
- [Features](#features)
  - [Frontend Features](#frontend-features)
  - [Backend Features](#backend-features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [How It Works](#how-it-works)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Communication Between Frontend and Backend](#communication-between-frontend-and-backend)
- [Getting Started](#getting-started)
  - [Setting Up the Backend](#setting-up-the-backend)
  - [Setting Up the Frontend](#setting-up-the-frontend)
- [Environment Variables](#environment-variables)
- [Application Structure](#application-structure)
  - [Frontend Structure](#frontend-structure)
  - [Backend Structure](#backend-structure)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Recipes](#recipes)
- [Folder Structure](#folder-structure)

---

## Overview

TastyList is a recipe management platform where users can:

- Browse a catalog of recipes.
- Search for recipes by title, ingredients, or description.
- Create, edit, and delete their own recipes.
- Recommend recipes they like.
- Switch between light and dark themes for a personalized experience.

The app is designed to be **user-friendly, responsive, and secure**, making it ideal for both casual cooks and professional chefs.

---

## Features

### Frontend Features

- **Home Page**: Displays a welcoming message and highlights the latest recipes.
- **Recipe Catalog**: Browse all available recipes.
- **Recipe Details**: View detailed information about a recipe.
- **Search**: Search recipes by title, ingredients, or description.
- **Authentication**: Login, register, and logout functionality.
- **Recipe Management**: Create, edit, and delete recipes.
- **Dark Mode**: Toggle between light and dark themes.
- **Notifications**: Success and error messages for user actions.

### Backend Features

- **Authentication**: Secure user registration, login, and logout using JWT.
- **Recipe Management**: CRUD operations for recipes.
- **Recommendations**: Users can recommend recipes.
- **Search**: Full-text search for recipes.
- **Error Handling**: Centralized error handling for consistent API responses.

---

## Technologies Used

### Frontend

- **React**: Component-based UI library.
- **TypeScript**: Type-safe JavaScript.
- **TailwindCSS**: Utility-first CSS framework.
- **React Router**: For navigation.
- **Axios**: For API calls.

### Backend

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and recipe data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For secure authentication.
- **bcrypt**: For password hashing.

---

## How It Works

### Frontend

The frontend is built with **React** and **TypeScript**. It uses:

- **Context API** for managing global states like authentication and notifications.
- **Custom Hooks** for handling API calls and theme toggling.
- **React Router** for navigation between pages.

### Backend

The backend is built with **Node.js** and **Express**. It:

- Handles user authentication using **JWT**.
- Manages recipes with **CRUD operations**.
- Provides a **RESTful API** for the frontend to interact with.
- Uses **MongoDB** for data storage.

---

## Communication Between Frontend and Backend

- The frontend communicates with the backend via **Axios**.
- API endpoints are secured with **JWT** for authenticated routes.
- **CORS** is enabled to allow communication between the frontend (`http://localhost:5173`) and the backend (`http://localhost:5025`).

---

## Getting Started

### Getting Started with TastyList

To begin working on the TastyList project, follow these steps to clone the repository and set up the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/Victor-starr/Softuni_React_Project.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Softuni_React_Project
   ```

### Setting Up the Backend

1. Navigate to the server directory:
   ```bash
   cd /server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=5025
   FRONTEND_URL=http://localhost:5173
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   SESSION_SECRET=your_session_secret_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. The backend will run at `http://localhost:5025`.

### Setting Up the Frontend

1. Navigate to the client directory:
   ```bash
   cd /client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory with the following variable:
   ```env
   VITE_BACKEND_URL=http://localhost:5025
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. The frontend will run at `http://localhost:5173`.

---

## Environment Variables

| Variable         | Description                                 | Example Value                   |
| ---------------- | ------------------------------------------- | ------------------------------- |
| PORT             | Port for the backend server                 | 5025                            |
| FRONTEND_URL     | URL of the frontend                         | http://localhost:5173           |
| MONGODB_URI      | MongoDB connection string                   | mongodb+srv://user:pass@cluster |
| JWT_SECRET       | Secret key for JWT                          | your_jwt_secret_key             |
| SESSION_SECRET   | Secret key for session management           | your_session_secret_key         |
| VITE_BACKEND_URL | URL of the backend for the frontend to call | http://localhost:5025           |

---

## Application Structure

### Frontend Structure

- **Pages**: Components for different routes (e.g., Home, Catalog, Details, Auth).
- **Components**: Reusable UI components (e.g., Header, Footer, Recipe).
- **Context**: Global state management (e.g., AuthContext, NotificationContext).
- **Hooks**: Custom hooks for API calls and theme toggling.
- **Styles**: Global styles using TailwindCSS.

### Backend Structure

- **Controllers**: Handle API routes (e.g., authController, catalogController).
- **Services**: Business logic for authentication and recipe management.
- **Models**: Mongoose schemas for User and Recipe.
- **Middlewares**: Authentication and error handling.
- **Utils**: Utility functions (e.g., errorHandler).

---

## API Endpoints

### Authentication

| Method | Endpoint         | Description               | Protected |
| ------ | ---------------- | ------------------------- | --------- |
| POST   | `/auth/register` | Register a new user       | No        |
| POST   | `/auth/login`    | Log in a user             | No        |
| POST   | `/auth/logout`   | Log out the current user  | Yes       |
| GET    | `/auth/check`    | Check user authentication | Yes       |

---

## Folder Structure

This documentation provides a **comprehensive guide** to understanding, setting up, and running the TastyList project. It is designed to help developers quickly get started and contribute effectively.
