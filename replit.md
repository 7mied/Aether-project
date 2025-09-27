# Overview

Aether-project is a full-stack web application built with a React frontend and Express.js backend. The project follows a traditional client-server architecture with a PostgreSQL database for data persistence. The application appears to be focused on user management and authentication, providing registration functionality as a foundation for further development.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 19.1.1 with Vite as the build tool and development server
- **Styling**: Tailwind CSS for utility-first styling approach
- **Development Tools**: ESLint for code quality, with React-specific plugins for hooks and refresh
- **Build System**: Vite with React plugin, configured to run on host 0.0.0.0:5000 for Replit compatibility

## Backend Architecture
- **Framework**: Express.js 5.1.0 as the web server framework
- **Database Layer**: PostgreSQL with native `pg` driver using connection pooling
- **Authentication**: bcryptjs for password hashing and validation
- **API Design**: RESTful API structure with modular route handling
- **Error Handling**: Comprehensive error handling for uncaught exceptions and unhandled rejections

## Data Model
- **User Entity**: Core user model with fields for id (serial primary key), name, email (unique), password (hashed), and timestamp
- **Database Pattern**: Active Record pattern implemented through custom User class with static methods
- **Schema Management**: Automatic table creation on server startup

## Security Considerations
- **Password Security**: bcryptjs with salt rounds for secure password storage
- **CORS**: Configured for cross-origin requests between frontend and backend
- **Input Validation**: Basic validation for user registration (duplicate email checking)

## Development Environment
- **Containerization**: Configured for Replit deployment with specific host and port bindings
- **Environment Variables**: dotenv for configuration management
- **Code Quality**: ESLint configuration with React-specific rules and modern JavaScript standards

# External Dependencies

## Core Dependencies
- **React Ecosystem**: React 19.1.1, React DOM for frontend UI framework
- **Build Tools**: Vite (rolldown-vite variant) for fast development and building
- **Styling**: Tailwind CSS 4.1.13 with PostCSS and Autoprefixer

## Backend Dependencies
- **Web Framework**: Express.js 5.1.0 for HTTP server and routing
- **Database**: PostgreSQL with `pg` 8.16.3 driver for database connectivity
- **Security**: bcryptjs 3.0.2 for password hashing
- **Utilities**: CORS 2.8.5 for cross-origin requests, dotenv 17.2.2 for environment management
- **HTTP Client**: Axios 1.12.2 for potential API calls

## Development Dependencies
- **Code Quality**: ESLint with React plugins for code linting and formatting
- **Type Support**: TypeScript type definitions for React and React DOM
- **Build Tools**: Various Babel and build-related packages for compilation and optimization

## Database Integration
- **Connection Management**: PostgreSQL connection pooling for efficient database connections
- **Schema Management**: Automatic table initialization on application startup
- **Query Interface**: Direct SQL queries through pg driver with parameterized statements for security