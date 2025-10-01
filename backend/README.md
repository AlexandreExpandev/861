# Todo List API

A RESTful API for managing todo lists built with Node.js, Express, TypeScript, and SQL Server.

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
- **ORM**: Native SQL with mssql package

## Getting Started

### Prerequisites

- Node.js (v14+)
- SQL Server (local or remote)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/todo-list-api.git
   cd todo-list-api
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`
   ```bash
   cp .env.example .env
   ```

4. Set up the database
   - Create a new SQL Server database
   - Update the `.env` file with your database credentials

5. Run database migrations (if applicable)

6. Start the development server
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/external/auth/register` - Register a new user
- `POST /api/external/auth/login` - Login and get JWT token

### Tasks

- `GET /api/internal/tasks` - Get all tasks for the authenticated user
- `GET /api/internal/tasks/:id` - Get a specific task
- `POST /api/internal/tasks` - Create a new task
- `PUT /api/internal/tasks/:id` - Update a task
- `DELETE /api/internal/tasks/:id` - Delete a task

## Project Structure

```
src/
├── api/                  # API controllers
│   ├── external/         # Public endpoints
│   └── internal/         # Authenticated endpoints
├── config/               # Application configuration
├── instances/            # Service instances
├── middleware/           # Express middleware
├── routes/               # Route definitions
├── services/             # Business logic
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── server.ts            # Application entry point
```

## Development

### Build

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
