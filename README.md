**Project Title and Description**

Procrastinot is a web application designed to help users manage their tasks and projects efficiently. It offers features like creating to-do lists, tracking the time spent on tasks, and moving projects between different statuses. The app aims to make time and task management fun and easy with a user-friendly interface and design.

**Table of Contents**

-   Getting Started
-   Features
-   Usage
-   API Endpoints
-   Folder Structure
-   Contributing
-   License
-   Acknowledgements

**Getting Started**

**Prerequisites**

-   Node.js v14.x or higher
-   MongoDB
-   npm or pnpm (recommended)
-   Postman or Insomnia for API testing (optional)

**Installation**

1.  Clone the repository:\
    `git clone https://github.com/yourusername/procrastinot.git`

2.  Navigate to the project directory:\
    `cd procrastinot`

3.  Install dependencies:\
    `pnpm install`

4.  Set up your environment variables. Create a `.env` file in the root directory and add the following:

    make .env file:

    bash

    Copy code

    `MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    PORT=5006`

5.  Start the server:

    bash

    Copy code

    `pnpm start`

6.  Open your browser and navigate to `http://localhost:3000` to access the application.

**Features**

-   **User Authentication:** Register, login, and manage user profiles.
-   **Task Management:** Create, update, and delete tasks with different statuses (To-Do, Working, Completed).
-   **Time Tracking:** Track time spent on each task and move tasks between statuses.
-   **Responsive Design:** Optimized for both desktop and mobile use.
-   **Starry Background:** Animated starry background for an engaging user experience.

**Usage**

**Login**

1.  Navigate to the login page.
2.  Enter your email and password.
3.  Click the `Login` button to access your dashboard.

**Manage Projects**

1.  Go to the `To-Do` page to view pending tasks.
2.  Move tasks to `Working` or `Completed` as you progress through them.
3.  Use the timer feature to track how long you spend on each task.

**Delete Profile**

1.  Navigate to the `Profile` page.
2.  Click the `Delete Profile` button to permanently remove your profile. A confirmation prompt will appear before deletion.

**API Endpoints**

**Authentication**

-   **Register**

    -   `POST /auth/register`
    -   Request: `{ "username": "test", "email": "test@example.com", "password": "yourpassword" }`
    -   Response: `{ "token": "your_jwt_token" }`
-   **Login**

    -   `POST /auth/login`
    -   Request: `{ "email": "test@example.com", "password": "yourpassword" }`
    -   Response: `{ "token": "your_jwt_token", "user": { "_id": "userid", "username": "test", "email": "test@example.com" } }`
-   **Delete User**

    -   `DELETE /users/:id`
    -   Request: `Header: { "x-auth-token": "your_jwt_token" }`
    -   Response: `{ "message": "User deleted successfully." }`

**Projects**

-   **Get Projects**

    -   `GET /projects`
    -   Response: `[ { "_id": "projectid", "title": "Project Title", "status": "To-Do" } ]`
-   **Add Project**

    -   `POST /projects`
    -   Request: `{ "title": "New Project", "description": "Project Description" }`
    -   Response: `{ "_id": "projectid", "title": "New Project", "description": "Project Description" }`
-   **Update Project**

    -   `PUT /projects/:id`
    -   Request: `{ "status": "Working" }`
    -   Response: `{ "message": "Project updated successfully." }`

Folder Structure
----------------

```bash


`procrastinot
├── client               # React frontend
│   ├── public           # Static files
│   ├── src              # React components, pages, redux state
│   └── index.js         # Entry point for React
├── server               # Node.js backend
│   ├── models           # Mongoose schemas
│   ├── routes           # API routes
│   └── server.js        # Entry point for backend
└── .env                 # Environment variables`
```
Contributing
------------

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature-branch`).
6.  Open a pull request.

License
-------

This project is licensed under the MIT License - see the <LICENSE> file for details.

Acknowledgements
----------------

-   [React](https://reactjs.org/)
-   [Node.js](https://nodejs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Express](https://expressjs.com/)
