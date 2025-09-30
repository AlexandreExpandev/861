# TO DO List API

A RESTful API for managing to-do lists built with Node.js, Express, TypeScript, and SQL Server.

## Features

- User authentication (register, login)
- Task management (create, read, update, delete)
- Task prioritization
- Due date tracking

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQL Server
- **Authentication**: JWT
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js (v14+)
- SQL Server

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/todolist-api.git
   cd todolist-api
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your database credentials and other settings

5. Start the development server
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/external/auth/register` - Register a new user
- `POST /api/external/auth/login` - Login a user

### Tasks

- `GET /api/internal/tasks` - Get all tasks
- `POST /api/internal/tasks` - Create a new task
- `GET /api/internal/tasks/:id` - Get a specific task
- `PUT /api/internal/tasks/:id` - Update a task
- `DELETE /api/internal/tasks/:id` - Delete a task

## Project Structure

```
src/
├── api/                    # API controllers
│   ├── external/           # Public endpoints
│   └── internal/           # Authenticated endpoints
├── config/                 # Application configuration
├── database/               # Database connection and queries
├── middleware/             # Express middleware
├── routes/                 # Route definitions
├── services/               # Business logic
├── utils/                  # Utility functions
└── server.ts              # Application entry point
```

## License

This project is licensed under the MIT License.
