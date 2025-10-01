# TODO List API

A RESTful API for managing tasks in a TODO list application.

## Features

- User authentication (register, login)
- Task management (create, read, update, delete)
- Task prioritization and due dates
- Secure API with JWT authentication

## Tech Stack

- Node.js
- Express.js
- TypeScript
- SQL Server
- Prisma ORM
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- SQL Server instance
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd todo-list-api
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database

```bash
npx prisma migrate dev --name init
```

5. Start the development server

```bash
npm run dev
# or
yarn dev
```

## API Endpoints

### Authentication

- `POST /api/external/auth/register` - Register a new user
- `POST /api/external/auth/login` - Login a user

### Tasks

- `GET /api/internal/tasks` - Get all tasks
- `GET /api/internal/tasks/:id` - Get a specific task
- `POST /api/internal/tasks` - Create a new task
- `PUT /api/internal/tasks/:id` - Update a task
- `DELETE /api/internal/tasks/:id` - Delete a task

## Development

### Build

```bash
npm run build
# or
yarn build
```

### Lint

```bash
npm run lint
# or
yarn lint
```

### Test

```bash
npm test
# or
yarn test
```

## License

This project is licensed under the MIT License.
