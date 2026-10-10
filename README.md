# OhMind-Admin

OhMind Admin is a modern admin dashboard starter built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and a shadcn-style UI layer.

## Features

- Authentication screen with a polished admin login experience
- App shell layout with header, sidebar, and dashboard route
- React Query setup for future API integration
- Zustand-based auth state store
- Tailwind-powered styling with shadcn-compatible UI primitives

## Tech Stack

- Next.js 15.3.3
- React 19.1.0
- TypeScript 5.7.3
- Tailwind CSS 4.1.0
- TanStack React Query 5.66.0
- Zustand 5.0.1
- shadcn-style UI components via Radix UI and class-variance-authority

## Project Structure

- src/app - App router pages and layouts
- src/components - Shared UI components and shadcn-inspired primitives
- src/features - Feature-based modules such as authentication
- src/providers - Query and other providers
- src/services - API service layer
- src/styles - Global styles and theme tokens

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the development server
   ```bash
   npm run dev
   ```

3. Open your browser at
   ```text
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev`: Start development server with hot reload.
- `npm run build`: Create an optimized production build.
- `npm run start`: Serve the production build.
- `npm run lint`: Run ESLint analysis to check for code quality issues.
- `npm run lint:fix`: Automatically fix linting errors.
- `npm run format`: Format code using Prettier.
- `npm run type-check`: Validate TypeScript types across the project.
