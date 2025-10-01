-- Create database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'todo_list')
BEGIN
    CREATE DATABASE todo_list;
END
GO

USE todo_list;
GO

-- Users table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) NOT NULL,
        password NVARCHAR(100) NOT NULL,
        createdAt DATETIME2 NOT NULL,
        updatedAt DATETIME2 NOT NULL,
        deleted BIT NOT NULL DEFAULT 0
    );
    
    CREATE UNIQUE INDEX ix_users_email ON users(email) WHERE deleted = 0;
END
GO

-- Tasks table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tasks')
BEGIN
    CREATE TABLE tasks (
        id INT IDENTITY(1,1) PRIMARY KEY,
        userId INT NOT NULL,
        title NVARCHAR(100) NOT NULL,
        description NVARCHAR(500) NULL,
        dueDate DATE NULL,
        priority NVARCHAR(20) NOT NULL DEFAULT 'medium',
        completed BIT NOT NULL DEFAULT 0,
        createdAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        updatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        deleted BIT NOT NULL DEFAULT 0,
        CONSTRAINT fk_tasks_users FOREIGN KEY (userId) REFERENCES users(id)
    );
    
    CREATE INDEX ix_tasks_userId ON tasks(userId) WHERE deleted = 0;
    CREATE INDEX ix_tasks_dueDate ON tasks(userId, dueDate) WHERE deleted = 0;
    CREATE INDEX ix_tasks_priority ON tasks(userId, priority) WHERE deleted = 0;
    CREATE INDEX ix_tasks_completed ON tasks(userId, completed) WHERE deleted = 0;
END
GO
