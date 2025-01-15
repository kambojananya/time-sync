# TimeSync - Team Scheduling Application

![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite)

TimeSync is a comprehensive team scheduling application designed to simplify the process of coordinating meetings across different time zones. It provides an intuitive interface for managing team members, their availability, and scheduling events.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- **Frontend**:
  - Next.js 13: React framework for building the user interface
  - React 18: JavaScript library for building user interfaces
  - TypeScript: Typed superset of JavaScript
  - Tailwind CSS: Utility-first CSS framework for styling
  - shadcn/ui: Reusable UI components built with Radix UI and Tailwind CSS

- **Backend**:
  - Next.js API Routes: Serverless functions for handling API requests
  - SQLite: Lightweight, serverless database for storing application data
  - sqlite3: SQLite driver for Node.js
  - sqlite: Promise-based wrapper for sqlite3

- **Development Tools**:
  - ESLint: JavaScript linter for identifying and reporting code issues
  - Prettier: Code formatter for maintaining consistent code style

## Features

- Interactive team calendar with week and 2-week views
- Team member management with customizable availability
- Timezone selection for accurate scheduling across different regions
- Meeting scheduler with Zoom integration (placeholder)
- Event creation and management
- Team notes for collaborative communication
- Public view for sharing team schedules

## Project Structure

## Project Architecture

The following diagram illustrates the high-level architecture and component structure of the TimeSync application:

```mermaid
graph TD
    A[Browser] -->|HTTP Requests| B[Next.js Server]
    B -->|Server-Side Rendering| C[React Components]
    B -->|API Routes| D[SQLite Database]
    
    subgraph "Frontend Components"
    C --> E[Calendar]
    C --> F[TeamMemberList]
    C --> G[TimezoneSelector]
    C --> H[MeetingScheduler]
    C --> I[EventForm]
    C --> J[Notes]
    end
    
    subgraph "API Routes"
    D --> K[/api/members]
    D --> L[/api/events]
    end
    
    M[Public View] --> C
    
    classDef component fill:#f9f,stroke:#333,stroke-width:2px;
    classDef database fill:#beb,stroke:#333,stroke-width:2px;
    classDef api fill:#bbf,stroke:#333,stroke-width:2px;
    
    class E,F,G,H,I,J,M component;
    class D database;
    class K,L api;
```

This diagram shows:
- The main components of the application
- The flow of data between the frontend, backend, and database
- The relationship between different parts of the system

The TimeSync application uses a Next.js server for both server-side rendering of React components and handling API routes. The SQLite database is used to store and retrieve data about team members and events. The frontend is composed of several React components that interact with the backend through API routes.



