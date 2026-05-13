# PDP - Product Detail Page Application

A modern product detail page application built with Vue 3, TypeScript, and Vite. Features include product browsing, shopping cart management, and user authentication.

## Project Overview

This is a single-page e-commerce application frontend with the following main features:

- **Product Browsing** - View product list with lazy-loaded images
- **Product Details** - View detailed product information including size, color, and price variants
- **Shopping Cart** - Add products to cart and manage cart contents
- **User Authentication** - User registration and login functionality

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Library**: Element Plus
- **Routing**: Vue Router
- **Testing**: Vitest + Vue Test Utils
- **Code Quality**: ESLint + Prettier
- **Utilities**: Underscore.js (for debounce and other utility functions)

## Getting Started

### Prerequisites

Before you begin, ensure your development environment meets the following requirements:

- **Node.js**: `^20.19.0 || >=22.12.0`
- **npm**: Latest version

Check your Node.js version:

```bash
node -v
```

### 1. Install Dependencies

First, install the project dependencies:

```bash
npm install
```

### 2. Start Development Server

After installation, start the development server:

```bash
npm run dev
```

The development server will start at `http://localhost:5173` (or another port assigned by Vite).

### 3. Access the Application

Open the URL displayed in your terminal to view the application.

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server with Hot Module Replacement (HMR).

### Build for Production

```bash
npm run build
```

Builds the application for production and outputs to the `dist/` directory.

### Type Checking

```bash
npm run type-check
```

Runs TypeScript type checking using `vue-tsc`.

### Run Unit Tests

```bash
npm run test:unit
```

Runs unit tests using Vitest.

Test files are located in the `src/__tests__/` directory and cover the following modules:

- `api/mock.spec.ts` - Mock API tests
- `api/mockData.spec.ts` - Mock data tests
- `api/types.spec.ts` - API type tests
- `pages/services.spec.ts` - Service layer tests
- `router/index.spec.ts` - Router configuration tests
- `types/frontend.spec.ts` - Frontend type tests
- `utils/lazy.spec.ts` - Image lazy loading directive tests
- `App.spec.ts` - Root component tests

## Project Structure

```
PDP/
├── src/
│   ├── __tests__/          # Unit test files
│   ├── api/                # API layer
│   │   ├── mock.ts         # Mock API implementation
│   │   ├── mockData.ts     # Mock data
│   │   └── types.ts        # API type definitions
│   ├── assets/             # Static assets
│   ├── components/         # Vue components
│   ├── pages/              # Page components and services
│   ├── router/             # Router configuration
│   ├── types/              # Frontend type definitions
│   ├── utils/              # Utility functions and directives
│   ├── App.vue             # Root component
│   └── main.ts             # Application entry point
├── public/                 # Public static assets
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
└── package.json            # Project configuration
```

## Development Guide

### Recommended IDE Setup

- **VS Code** + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - Disable Vetur if installed
  - Use Vue Language Features (Volar) for the best development experience

## Features

### Image Lazy Loading

The project implements a custom image lazy loading directive `v-lazy` that loads images when they enter the viewport:

```vue
<img v-lazy="imageUrl" alt="product image" />
```

### Mock API

All backend API calls are implemented through Mock API, with data stored in the browser's localStorage for easy development and testing.

### Responsive Design

Uses Element Plus component library to ensure the application displays well on different devices.

## Configuration

For custom Vite configuration, see the [Vite Configuration Reference](https://vite.dev/config/).

## Test Coverage

The project includes comprehensive unit tests covering:

- API methods (login, register, logout, getCurrentUser, getGoodList, getGoodInfo, addToCart, getCartById)
- Service layer functions
- Router configuration
- Type definitions
- Image lazy loading directive
- Vue components

Run tests with:

```bash
npm run test:unit
```

Or run tests in watch mode:

```bash
npm run test:unit -- --watch
```
