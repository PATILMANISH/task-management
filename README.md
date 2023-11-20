# Advanced Task Management Tool

This is an advanced task management tool built with React, Typescript, Tailwind, Node, Express, Redux Toolkit, JWT, and Vite. It offers a comprehensive set of features to manage tasks efficiently.

## Technologies Used
- React
- Typescript
- Tailwind CSS
- Node
- Express
- Redux Toolkit
- JWT (JSON Web Tokens)
- Vite

## Features

### Frontend
- **Styling with Tailwind CSS:** The user interface is styled using Tailwind CSS to achieve a modern and responsive design.

- **React App with Typescript using Vite:** The application is built with React and Typescript using Vite for a fast development experience.

- **Login and Signup Page:** The tool includes a single-page application with dedicated pages for user authentication.

- **JWT Authentication:** User authentication is implemented using JSON Web Tokens (JWT) for secure and efficient authorization.

- **Form Validation:** Visually appealing toast messages and on-page validation are implemented in the signup/login pages for an enhanced user experience.

- **Redux Toolkit (RTK):** Global state management is handled using Redux Toolkit, with slices created for managing users and tasks.

- **React Router:** Navigation within the application is facilitated by React Router for a seamless user experience.

- **Task Management:**
  - Create, delete, update, and mark tasks as complete.
  - Drag-and-drop functionality for task organization.
  - Task filtering based on status.

- **Local Database:** A local database is implemented to store user and task information.

- **Offline Sync:** Local storage is used for offline synchronization of tasks.

### Backend
- **Node with Express:** The backend server is created using Node.js with the Express framework for building robust APIs.

- **API Integration:**
  - Login and signup endpoints for user authentication.
  - Task-related endpoints for creating, updating, and managing tasks.

- **User Assignment:** Tasks are associated with users, enabling efficient task management by user.

- **Environment Variables:** Sensitive information and credentials are stored securely using environment variables.

## Getting Started

1. Clone the repository.
2. Install dependencies for both the frontend and backend.
3. Set up environment variables with necessary credentials.
4. Run the application.

## Getting Started

 Clone the repository: https://github.com/PATILMANISH/task-management.git
 
### Frontend
   ```bash
   git clone https://github.com/PATILMANISH/task-management.git
   cd task-management
   npm install
   npm run dev
   ```
   
### Backend
   ```bash
   cd task-management/backend
   npm install
   node server.js
   ```

## Usage
Open your browser and visit http://localhost:5173 to access the application.

1. Navigate to the login/signup page.
2. Authenticate using JWT tokens.
3. Start managing tasks efficiently with the various features provided.

## Snaps
# Login Screen with Validation
![image](https://github.com/PATILMANISH/task-management/assets/20597500/3099aa60-5ace-4329-bbe3-29f1fa5106c0)

# Register Screen with Validation
![image](https://github.com/PATILMANISH/task-management/assets/20597500/47440f80-e426-4067-89f1-f535509a192c)

# Main Screen
![image](https://github.com/PATILMANISH/task-management/assets/20597500/3975d3f1-33e3-4188-8e5c-6f1c86d457a7)
![image](https://github.com/PATILMANISH/task-management/assets/20597500/e6add36c-e668-4fb3-ae94-7fda0daec2d9)


## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
