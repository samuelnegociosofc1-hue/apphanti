# Guardião Mobile

## Overview

Guardião Mobile is a mobile security simulator application built with a React frontend and Express backend. The application simulates a mobile device security scanning process, providing users with an interactive interface that mimics security analysis features like memory checking, app scanning, network analysis, and file verification. The project is designed as a demonstration or educational tool for mobile security concepts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and React hooks for local state
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Storage**: In-memory storage implementation with interface-based design for easy database migration
- **Development**: Hot module replacement and runtime error overlay for development experience

### Project Structure
- **Monorepo**: Single repository containing client, server, and shared code
- **Shared Schema**: Common TypeScript types and Zod schemas in `/shared` directory
- **Client**: React application in `/client` directory
- **Server**: Express API in `/server` directory
- **Path Aliases**: Configured for clean imports (`@/`, `@shared/`)

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect configured
- **Schema**: User table with username/password fields and UUID primary keys
- **Validation**: Zod schemas for runtime type validation
- **Storage Interface**: Abstract storage interface allowing easy switching between in-memory and database storage

### Development Workflow
- **Type Checking**: Shared TypeScript configuration across client and server
- **Hot Reload**: Vite development server with Express middleware integration
- **Build Process**: Separate build commands for client (Vite) and server (esbuild)
- **Database Migration**: Drizzle Kit for database schema management

## External Dependencies

### Core Framework Dependencies
- **React**: Frontend framework with React DOM
- **Express**: Backend web framework
- **TypeScript**: Type safety across the entire stack
- **Vite**: Build tool and development server

### UI and Styling
- **Shadcn/ui**: Component library built on Radix UI
- **Radix UI**: Headless UI primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: Utility for managing component variants

### Data Management
- **Drizzle ORM**: Type-safe database toolkit
- **Drizzle Zod**: Integration between Drizzle and Zod
- **Zod**: Schema validation library
- **TanStack Query**: Server state management
- **React Hook Form**: Form state management

### Database
- **Neon Database**: Serverless PostgreSQL database
- **PostgreSQL**: Primary database engine

### Development Tools
- **Wouter**: Lightweight React router
- **Date-fns**: Date manipulation library
- **Nanoid**: Unique ID generation
- **ESBuild**: Fast JavaScript bundler for server builds

### Replit Integration
- **Replit Plugins**: Development environment integration for error handling and cartography