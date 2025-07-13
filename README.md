# webz-data-ingestion-service

[//]: # (Badges can be added here, e.g. build status, license, etc.)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [NPM Scripts](#npm-scripts)
- [Design Decisions](#design-decisions)
- [Known Limitations & TODOs](#known-limitations--todos)
- [Contributing](#contributing)

## Overview

`webz-data-ingestion-service` is a backend Node.js service built with TypeScript that integrates with the Webz.io API to fetch news posts and store them in a PostgreSQL database. It is designed to handle paginated data fetching, recursive syncing, and clean data persistence. This project demonstrates clean code practices, modular architecture, and unit testability.

## Features

- Connects to the Webz.io API to fetch news posts using configurable queries
- Recursively fetches paginated results until all posts are retrieved
- Stores data efficiently in PostgreSQL with a well-defined schema
- Configurable via environment variables for flexible deployment
- Implements clean separation of concerns with services and repositories
- Unit tested with Jest to ensure code quality and reliability
- Designed with extensibility in mind (e.g., query builder pattern planned)

## Getting Started

### Prerequisites

- Node.js (version 18+ recommended)
- PostgreSQL (can be run locally or via Docker)
- npm package manager (yarn or pnpm can be used with some alterations)

### Setup

1. Clone the repository
    ```shell
    git clone https://github.com/scriptjumper/webz-data-ingestion-service.git
    cd webz-data-ingestion-service
    ```
2. Install dependencies
    ```shell
    npm install
    ```
3. Configure environment variables

    Create a `.env` file in the root directory. Example:
    ```shell
    # PostgreSQL connection string
    DATABASE_URL=postgres://postgres:postgres@localhost:5432/webz

    # Webz.io REST API
    WEBZ_API_URL=https://api.webz.io
    WEBZ_API_TOKEN=your_token_here
    WEBZ_QUERY=tesla
    ```

4. Run PostgreSQL database

    You can use Docker Compose or install PostgreSQL locally. Example using Docker:
    ```shell
    docker-compose up -d
    ```
5. Run the application
    ```shell
    npm run dev
    ```

### Running Tests

Unit tests are implemented with Jest. To run all tests:
```shell
npm run test
```
To run a specific test file:
```shell
npx jest path/to/your/testfile.test.ts
```
Tests use mocks to avoid real API calls or database interaction. Test files are located in `src/**/__tests__/`.

## Project Structure

- `src/app`: Application logic (sync process)
- `src/services`: API integration services
- `src/infrastructure/repositories`: Database repository implementations
- `src/utils`: Utility modules like logger
- `src/config`: Configuration and DB initialization

## NPM Scripts

- `npm run dev` — Start the app in development mode with ts-node
- `npm run test` — Run all Jest unit tests
- `npm run lint` — Lint the codebase using ESLint
- `npm run lint:fix` — Lint and auto-fix issues
- `npm run build` — Compile TypeScript to JavaScript in the `dist/` folder

## Design Decisions

- **TypeScript:** for type safety and better developer experience
- **Promises and async/await:** for clean asynchronous code
- **Repository pattern:** abstracts data persistence, enabling easy future switch to GraphQL or other DBs
- **Environment configuration:** supports flexible deployment and secret management
- **Unit testing:** critical parts are covered with Jest tests mocking external dependencies
- **Logging:** basic structured logging to track execution and errors

## Known Limitations & TODOs

- Pagination currently fetches 10 posts per request due to API limits; planned enhancements include a full query builder and improved rate-limit handling
- No integration tests yet; only unit tests with mocks
- No incremental sync support yet (fetching new data since last run)
- Raw SQL used for persistence; future plan to migrate to GraphQL API integration
- Retry logic for failed API calls is not implemented
- Docker Compose currently manages only PostgreSQL; app containerization planned

## Usage Example

When the sync runs successfully, you should see logs similar to:
```
INFO  Callback: Retrieved 10 posts; Total results: 100
INFO  Sync process completed successfully
```

## Contributing

Contributions welcome! Please open issues or pull requests for suggestions and improvements.