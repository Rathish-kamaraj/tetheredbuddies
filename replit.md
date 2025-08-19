# Overview

This is a 3D cooperative platform game called "Tethered Buddies" built with React, Three.js, and Express. Two players are connected by a rope and must work together to reach exit zones across 5 progressively challenging levels. The game features physics-based movement, collision detection, audio feedback, and a level progression system. The frontend uses React Three Fiber for 3D rendering and Tailwind CSS with shadcn/ui components for the UI. The backend is a minimal Express server with Drizzle ORM and PostgreSQL for data persistence.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side application is built with React and uses a component-based architecture:

- **3D Rendering**: React Three Fiber (@react-three/fiber) with Drei (@react-three/drei) for helper components and post-processing effects
- **State Management**: Zustand stores for game state, audio management, and user preferences
- **Styling**: Tailwind CSS with custom design system and shadcn/ui component library
- **Physics**: Custom physics engine with collision detection and rope constraints
- **Audio**: HTML5 Audio API with centralized audio state management

Key architectural decisions:
- Separates game logic from rendering through custom hooks and stores
- Uses React refs for direct Three.js object manipulation
- Implements frame-based animation loop with useFrame hook
- Modular component structure for 3D objects (Player, Rope, Level)

## Backend Architecture

The server uses Express.js with a minimal API structure:

- **Framework**: Express.js with TypeScript for type safety
- **Database**: Drizzle ORM with PostgreSQL (Neon serverless)
- **Development**: Vite integration for hot module replacement
- **Build**: esbuild for server bundling and Vite for client assets
- **Storage**: Abstract storage interface with in-memory implementation for development

Key architectural decisions:
- API routes are prefixed with `/api` for clear separation
- Storage abstraction allows easy switching between databases
- Development and production builds use different bundlers for optimization
- Middleware logging for API requests

## Database Schema

Uses Drizzle ORM with PostgreSQL:

- **Users Table**: Basic user authentication with username/password
- **Schema Definition**: Type-safe schema with Zod validation
- **Migrations**: Automated schema management through Drizzle Kit

The database setup supports user authentication but the current game implementation doesn't require persistent storage.

## Game Architecture

- **Physics System**: Custom 2D physics with gravity, collision detection, and rope constraints
- **Game States**: Menu, playing, and won states with appropriate UI overlays
- **Controls**: Dual-player input system (WASD for player 1, arrow keys for player 2)
- **Audio System**: Background music, hit sounds, and success sounds with mute functionality

# External Dependencies

## Core Frameworks
- **React 18**: Frontend framework with concurrent features
- **Three.js**: 3D graphics library via React Three Fiber
- **Express.js**: Backend web server framework
- **Vite**: Build tool and development server

## Database & ORM
- **Drizzle ORM**: Type-safe database toolkit
- **Neon Database**: Serverless PostgreSQL hosting
- **PostgreSQL**: Primary database engine

## UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Lucide Icons**: Icon library

## State Management & Utils
- **Zustand**: Lightweight state management
- **TanStack Query**: Server state management
- **date-fns**: Date manipulation utilities
- **clsx**: Conditional CSS classes

## Development Tools
- **TypeScript**: Type safety across the stack
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler
- **PostCSS**: CSS post-processing

## Game-Specific
- **GLSL shader support**: Custom shader loading via vite-plugin-glsl
- **3D model support**: GLTF/GLB file handling for 3D assets
- **Audio file support**: MP3/OGG/WAV audio file handling