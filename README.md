# Fullstack Starter

Full-stack React + Express project with a mock login flow, Home dashboard, website traffic statistics, sidebar, navbar, and GitHub Actions CI.

## Requirements

- Node.js 22 or newer
- npm 10 or newer

## Install

```bash
npm install --workspaces
```

## Run locally

Development mode runs the backend and frontend together:

```bash
npm run dev
```

Development URLs:

- Frontend: `http://127.0.0.1:5173`
- Backend API: `http://127.0.0.1:5000`

Production-style local run:

```bash
npm run build
npm start
```

Then open:

```text
http://127.0.0.1:5000
```

## Mock Login

Use this account on the login screen:

```text
Username: admin@cursorflow.test
Password: Admin@1234
```

After login, the Home dashboard shows website traffic statistics and recent login activity. Click `Logout` in the navbar or sidebar to return to the login page.

## Useful Scripts

```bash
npm run dev
npm run dev:client
npm run dev:server
npm run build
npm start
```

## GitHub Actions

The workflow file is located at:

```text
.github/workflows/ci.yml
```

It runs automatically on:

- Push to `main` or `master`
- Pull request targeting `main` or `master`
- Manual run from the GitHub Actions tab

The CI job does this:

1. Checks out the repository
2. Sets up Node.js 22
3. Installs dependencies with `npm ci --workspaces`
4. Builds the frontend with `npm run build`
5. Starts the Express backend
6. Smoke tests:
   - `http://127.0.0.1:5000/api/health`
   - `http://127.0.0.1:5000/`

## How To Use GitHub Actions

1. Push this project to GitHub.
2. Open the repository on GitHub.
3. Go to the `Actions` tab.
4. Select `CI`.
5. Run it manually with `Run workflow`, or push to `main`/`master` to trigger it automatically.

If the workflow fails, open the failed run and check the failing step logs. The most likely issues are dependency installation errors, build errors, or the server not starting on port `5000`.

## Project Layout

```text
client/                 React + Vite app
server/                 Express API and production static server
.github/workflows/      GitHub Actions workflow files
```
