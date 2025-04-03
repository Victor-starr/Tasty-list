# TastyList Frontend Documentation

TastyList is a modern web application designed to help users explore, create, and manage recipes. The frontend is built with **React**, **TypeScript**, and **TailwindCSS**, offering a fast, responsive, and user-friendly experience.

## Navigation

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [How It Works](#how-it-works)
- [Application Structure](#application-structure)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)

## Overview

TastyList provides an intuitive platform for users to browse, search, and manage recipes. With authentication features, users can create their own recipes and engage with others through recommendations. The app also supports dark mode for a personalized experience.

## Features

### Home Page

- Displays a welcoming message.
- Highlights the most popular recipes.

### Recipe Catalog

- A collection of all available recipes.
- Users can browse and view details of recipes.

### Recipe Details

- Shows recipe title, description, ingredients, instructions, and an image.
- Logged-in users can recommend, unrecommend, edit, or delete their own recipes.

### Favorites

- Users can save their favorite recipes for quick access.
- Displays a list of saved recipes.

### Search

- Users can search recipes by title, ingredients, or description.
- Displays dynamic search results.

### Authentication

- **Login**: Users can log in to access more features.
- **Register**: New users can create an account.
- **Logout**: Users can log out securely.

### Recipe Management

- **Create**: Logged-in users can add their own recipes.
- **Edit**: Users can modify their recipes.
- **Delete**: Users can remove their recipes.

### Notifications

- Success or error messages appear after actions like login or recipe creation.

### Dark Mode

- Users can switch between light and dark themes.
- The preference is saved in local storage.

## Technologies Used

### React

- Provides a component-based structure for a seamless UI.

### TypeScript

- Ensures type safety and reduces runtime errors.

### TailwindCSS

- Utility-first styling for a responsive and modern design.

### React Router

- Handles navigation without page reloads.

### Axios

- Manages API calls and handles authentication tokens.

## How It Works

### Authentication

- Users register and log in to unlock advanced features.
- `AuthContext` manages authentication state.

### Recipe Management

- Recipes are fetched from the backend using Axios.
- Users can create, edit, and delete their own recipes.
- Recipes are displayed as cards for easy browsing.

### Search

- Users input a search query.
- Recipes matching the query dynamically appear.

### Dark Mode

- The toggle button allows switching themes.
- The theme preference is saved in local storage.

### Notifications

- Messages appear for login, recipe actions, and errors.
- They automatically disappear after a few seconds.

## Application Structure

### Pages

- **Home** – Welcome message & featured recipes.
- **Catalog** – Displays all available recipes.
- **Details** – Shows full recipe information.
- **Favorites** – Lists user’s favorite recipes.
- **Search** – Allows users to find recipes.
- **Auth** – Login, Register, and Logout pages.
- **Create/Edit** – Forms for creating and modifying recipes.

### Components

- **Header** – Navigation bar & theme toggle.
- **Footer** – Footer information.
- **Notification** – Displays success/error messages.
- **Recipe** – Reusable card component for recipes.
- **RecipeDetails** – Shows a single recipe in detail.

### Context

- **AuthContext** – Manages user authentication.
- **NotificationContext** – Handles success/error notifications.

### Custom Hooks

#### `useAuthAPI`

- Manages login, registration, and logout API calls.
- Handles form state and notifications.

#### `useRecipeAPI`

- Fetches, creates, updates, and deletes recipes.
- Handles search and recommendations.

#### `useThemeToggle`

- Manages dark mode settings.
- Retrieves and stores theme preference.

## Getting Started

### Prerequisites

- Install **Node.js** and **npm** on your machine.

### Installation

1. Clone the repository:

```bash
 git clone https://github.com/Victor-starr/Softuni_React_Project.git
 cd ./client
```

2. Install dependencies:

```bash
 npm install
```

3. Create a `.env` file in the client directory with the following variables:

```env
VITE_BACKEND_URL=http://localhost:5025
```

4. Start the development server:

```bash
 npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure

```
client/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── styles/           # Global styles (TailwindCSS)
│   ├── types.ts          # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point of the application
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── tailwind.config.js    # TailwindCSS configuration
```

This documentation provides a clear breakdown of how **TastyList** works and how you can navigate and contribute to the frontend project.
