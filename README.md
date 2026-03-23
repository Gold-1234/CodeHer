# CodeHer

CodeHer is a coding platform designed to help developers practice and improve their programming skills. It features a robust problem management system, an integrated online code editor with multi-language support, and tools for tracking progress.

[![Demo Video](https://img.youtube.com/vi/7b6MuhCpDo4/0.jpg)](https://youtu.be/7b6MuhCpDo4)

## 🚀 Features

- **Problem Solving**: Solve coding challenges with varying difficulty levels.
- **Online Compiler**: Write and execute code directly in the browser. Powered by Judge0.
  - Supports **Python**, **Java**, and **JavaScript**.
- **Code Submission**: Submit solutions and get results based on hidden test cases.
- **User Authentication**: Secure account creation and login via Email/Password and **Google OAuth**.
- **Progress Tracking**: Keep track of solved problems and view submission history.
- **Curated Lists**: Create and manage custom lists of problems to organize your practice.
- **Admin Dashboard**: Specialized capabilities for administrators to create, update, and manage problems.

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: JWT (JSON Web Tokens), Google Auth Library
- **Code Execution**: Judge0 API

### Frontend
- **Framework**: React
- **State Management**: Zustand
- **Routing**: React Router
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## 📂 Project Structure

The project is structured with the backend serving as the API and hosting the frontend logic.

```
backend/
├── src/                # Backend source code
│   ├── controllers/    # Request handlers (Auth, Problems, Lists, Execution)
│   ├── libs/           # Library configurations (DB, Judge0)
│   ├── routes/         # API route definitions
│   └── index.js        # Server entry point
├── frontend/           # Frontend React application
│   ├── src/
│   │   ├── store/      # Zustand state stores
│   │   └── ...
│   └── ...
└── ...
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js
- npm
- PostgreSQL database
- Judge0 API access (or self-hosted instance)

### 1. Backend Setup

1.  Navigate to the `backend` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    Create a `.env` file in the `backend` directory and configure the following:
    ```env
    PORT=8080
    DATABASE_URL="your_postgres_connection_string"
    JWT_SECRET="your_jwt_secret"
    FRONTEND_URL="http://localhost:5173"
    JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
    GOOGLE_CLIENT_ID="your_google_client_id"
    NODE_ENV="development"
    ```
4.  Run Database Migrations:
    ```bash
    npx prisma migrate dev
    ```
5.  Start the Server:
    ```bash
    npm start
    ```

### 2. Frontend Setup

1.  Navigate to the `frontend` directory (inside `backend`):
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Development Server:
    ```bash
    npm run dev
    ```