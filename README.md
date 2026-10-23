# Books Library Client

React + TypeScript frontend built as part of the technical test for the Books Library API, a REST API developed with C# and ASP.NET Core Web API. This client consumes that backend, which acts as a proxy between the frontend and [FakeRestAPI](https://fakerestapi.azurewebsites.net/index.html).

## Project Context

This repository is the frontend part of the technical test. The companion API was developed with C# and ASP.NET Core Web API and is available in the [Books Library API repository](https://github.com/luismanuelcldev/books-library-api). The frontend consumes that API, which in turn proxies requests to FakeRestAPI.

## Related API Repository

The backend for this technical test is available at:

```text
https://github.com/luismanuelcldev/books-library-api
```

## Tech Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- Axios
- React Router DOM
- Lucide React

## Features

- Book list with create, edit, delete and detail views
- Book detail page displaying related authors
- Author list with create, edit and delete actions
- "Books Published" count per author (grouped by full name and distinct book IDs)
- Route-based code splitting with React.lazy and Suspense
- Loading, empty and error states
- Centralized API error handling

## Project Structure

```text
src/
├── app/        # Application shell, router and global configuration
├── features/   # Domain modules (books, authors) with pages, components and services
└── shared/     # Reusable components, API client, types and utilities
```

- `app`: Application shell and routes
- `features/books`: Book pages, components and services
- `features/authors`: Author pages, components and services
- `shared`: API client, shared components and types

## Architecture

![Books Library Architecture](docs/Books%20Library%20Architecture%20Technical%20Test.png)

*End-to-end view of the technical test: React client, .NET backend with Clean Architecture and external FakeRestAPI.*

## Requirements

- Node.js 20+
- [Books Library API](https://github.com/luismanuelcldev/books-library-api) running at `http://localhost:5001`

## Getting Started

1. Install dependencies: `npm install`
2. Copy environment variables: `cp .env.example .env`
3. Start the [Books Library API](https://github.com/luismanuelcldev/books-library-api)
4. Run the development server: `npm run dev`

The application starts at the URL shown by Vite, usually `http://localhost:5173`.

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `VITE_API_URL` | Base URL of the Books Library API | `http://localhost:5001/api` |

## Available Scripts

```bash
npm run dev     # Start development server
npm run build   # Type-check and build for production
npm run lint    # Run ESLint
npm run preview # Preview production build locally
```

## Notes

- **API dependency:** The frontend requires the Books Library API to be running. All HTTP requests go through `src/shared/api/axiosClient.ts`.
- **FakeRestAPI limitations:** POST, PUT, and DELETE operations return successful responses, but changes are not persisted by FakeRestAPI. Newly created, updated, or deleted items may not appear in subsequent GET requests. This is the expected behavior of the third-party mock service.