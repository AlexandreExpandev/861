# TODO List API

A RESTful API for managing TODO lists built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- User authentication (register, login)
- Task management (create, read, update, delete)
- Task prioritization
- Due date tracking

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Zod Validation

## Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL

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

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and other settings
   ```

4. Set up the database
   ```bash
   npm run prisma:migrate
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/external/auth/register` - Register a new user
- `POST /api/external/auth/login` - Login and get JWT token

### Tasks

- `GET /api/internal/tasks` - Get all tasks
- `GET /api/internal/tasks/:id` - Get a specific task
- `POST /api/internal/tasks` - Create a new task
- `PUT /api/internal/tasks/:id` - Update a task
- `DELETE /api/internal/tasks/:id` - Delete a task

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## License

MIT
