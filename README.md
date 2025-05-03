# Procrastinot

**Procrastinot** is a web application designed to help users manage their tasks and projects efficiently. It features to-do lists, time tracking, and dynamic project statuses, all wrapped in an engaging and responsive user interface. Procrastinot aims to make time and task management fun, simple, and intuitive.

---

## 📑 Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Projects](#projects)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## 🚀 Getting Started

### Prerequisites

Before installing, make sure you have the following tools:

- Node.js v14.x or higher
- MongoDB
- `npm` or `pnpm` (recommended)
- Postman or Insomnia (optional, for API testing)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/procrastinot.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd procrastinot
   ```

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

4. **Set up environment variables:**  
   Create a `.env` file in the root directory with the following content:
   ```env
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5006
   ```

5. **Start the development server:**
   ```bash
   pnpm start
   ```

6. **Access the app:**  
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

---

## ✨ Features

- **User Authentication:** Register, login, and manage user profiles securely.
- **Task Management:** Create, update, and delete tasks with dynamic statuses (To-Do, Working, Completed).
- **Time Tracking:** Measure time spent on each task and track progress.
- **Responsive UI:** Works seamlessly on desktop and mobile devices.
- **Animated Starry Background:** Adds an engaging visual flair to the user experience.

---

## 🧭 Usage

### Login

- Go to the login page.
- Enter your email and password.
- Click **Login** to access your dashboard.

### Manage Projects

- Navigate to the **To-Do** page to view tasks.
- Drag or move tasks to **Working** or **Completed** statuses.
- Use the built-in timer to track your productivity.

### Delete Profile

- Visit the **Profile** page.
- Click **Delete Profile** to permanently remove your account (confirmation required).

---

## 📡 API Endpoints

### Authentication

#### Register

```http
POST /auth/register
```

**Request:**
```json
{
  "username": "test",
  "email": "test@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "your_jwt_token"
}
```

#### Login

```http
POST /auth/login
```

**Request:**
```json
{
  "email": "test@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "userid",
    "username": "test",
    "email": "test@example.com"
  }
}
```

#### Delete User

```http
DELETE /users/:id
```

**Headers:**
```http
x-auth-token: your_jwt_token
```

**Response:**
```json
{
  "message": "User deleted successfully."
}
```

---

### Projects

#### Get All Projects

```http
GET /projects
```

**Response:**
```json
[
  {
    "_id": "projectid",
    "title": "Project Title",
    "status": "To-Do"
  }
]
```

#### Add a New Project

```http
POST /projects
```

**Request:**
```json
{
  "title": "New Project",
  "description": "Project Description"
}
```

**Response:**
```json
{
  "_id": "projectid",
  "title": "New Project",
  "description": "Project Description"
}
```

#### Update a Project

```http
PUT /projects/:id
```

**Request:**
```json
{
  "status": "Working"
}
```

**Response:**
```json
{
  "message": "Project updated successfully."
}
```

---

## 📁 Folder Structure

```
procrastinot
├── client               # React frontend
│   ├── public           # Static files
│   ├── src              # Components, pages, redux state
│   └── index.js         # React entry point
├── server               # Node.js backend
│   ├── models           # Mongoose schemas
│   ├── routes           # Express routes
│   └── server.js        # Backend entry point
└── .env                 # Environment variables
```

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes.
4. Commit the changes:
   ```bash
   git commit -m 'Add some feature'
   ```
5. Push to your fork:
   ```bash
   git push origin feature-branch
   ```
6. Open a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
