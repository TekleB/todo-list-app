# Todo App

Simple Todo-List application built with, `Vite`, `React` and `TypeScript`. You can create, edit, update, delete, and mark as completed a to-do. Additionally, it offers the ability to filter and sort tasks based on various parameters.
## Todo App Documentation

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 20 or higher)
- npm (version 10 or higher)

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TekleB/todo-list-app.git
   cd todo-list-app
   ```

2. **Install dependencies:**

   ```bash
   yarn
   ```

3. **Create and Prepare `.env` file based on `.env.example`:**

## Running the Application

1. **Start the development server:**

   ```bash
   yarn dev
   ```

   This will start the Vite development server. Open your browser and navigate to `http://localhost:5000` to see the application.

2. **Build the application for production:**

   ```bash
   yarn build
   ```

   This will create a `dist` directory with the production build of the application.

3. **Preview the production build:**

   ```bash
   yarn preview
   ```

   This will start a local server to preview the production build. Open your browser and navigate to `http://localhost:5000`.

## Running Tests

1. **Run all tests:**

   ```bash
   yarn test
   ```

   This will run all the tests using Vitest.

2. **Run tests with coverage:**

   ```bash
   yarn test:coverage
   ```

   This will run all the tests and generate a coverage report.

## Linting

1. **Run the linter:**

   ```bash
   yarn lint
   ```

   This will run ESLint to check for code quality issues.

## Project Structure

- `src/`: Contains the source code of the application.
  - `components/`: Contains the React and `Shadcn/ui` components .
  - `pages/`: Contains the page components.
  - `store/`: Contains the Redux store configuration along with slices.
  - `types/`: Contains TypeScript type definitions.
  - `api/`: Contains API service functions.
  - `test/`: Contains test files.
- `public/`: Contains static assets.
- `dist/`: Contains the production build (generated after running `yarn build`).

## Configuration

- `vite.config.ts`: Vite and Vitest configuration file.
- `tsconfig.json`: TypeScript configuration file (aggregate of `tsconfig.app.json` and `tsconfig.node.json`).
- `package.json`: Contains project metadata, scripts and dependencies.

## Additional Information

- **React**: The application is built using React.
- **Redux Toolkit**: Used to handle State management.
- **Vite**: The application uses Vite as the build tool.
- **Vitest**: Testing is done using Vitest.
- **Tailwind CSS**: Used for styling.
- **Shadcn/ui**: used for UI component.
- **Date-fns**: used for date/time manipulation.
- **Zod**: used for input validation.
- **Vite-plugin-checker**: used for type checking for TypeScript, ESLint and vue-tsc using vite-plugin-checker (Watcher mode like).
