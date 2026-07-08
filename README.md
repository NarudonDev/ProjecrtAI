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

## Docker

Build the production image:

```bash
docker build -t projecrtai:local .
```

Run the container:

```bash
docker run --rm -p 5000:5000 --name projecrtai projecrtai:local
```

Open:

```text
http://127.0.0.1:5000
```

Run with Docker Compose:

```bash
docker compose up --build
```

Stop Compose:

```bash
docker compose down
```

### MySQL In Docker

Docker Compose also starts MySQL 8.4 with a persistent Docker volume.

Create a local env file from the example:

```bash
cp .env.example .env
```

Start MySQL only:

```bash
docker compose up -d mysql
```

Start the app and MySQL together:

```bash
docker compose up -d --build
```

Default MySQL connection values:

```text
Host from host machine: 127.0.0.1
Port: 3306
Database: projecrtai
User: projecrtai_user
Password: projecrtai_password
Root password: root_password
```

Inside the Docker network, the app can reach MySQL at:

```text
mysql:3306
```

Open a MySQL shell:

```bash
docker compose exec mysql mysql -uprojecrtai_user -pprojecrtai_password projecrtai
```

Open Adminer for browser-based MySQL access:

```bash
docker compose up -d adminer
```

Then open:

```text
http://127.0.0.1:8081
```

Adminer login:

```text
System: MySQL
Server: mysql
Username: projecrtai_user
Password: projecrtai_password
Database: projecrtai
```

Reset the MySQL data volume:

```bash
docker compose down -v
```

## Docker Image CI

The `Docker Image` GitHub Actions workflow builds and pushes this image to GitHub Container Registry:

```text
ghcr.io/narudondev/projecrtai:latest
```

It runs on pushes to `main` or `master`, and can also be started manually from the GitHub Actions tab.

If the workflow cannot push the image, check:

1. `Settings` -> `Actions` -> `General`.
2. Under `Workflow permissions`, select `Read and write permissions`.
3. Confirm that GitHub Packages is enabled for the repository/account.

## Kubernetes

Kubernetes manifests are in:

```text
k8s/
```

The default deployment image is:

```text
ghcr.io/narudondev/projecrtai:latest
```

For a local Kubernetes cluster such as Docker Desktop or Minikube, build an image and update the deployment image:

```bash
docker build -t projecrtai:local .
kubectl apply -k k8s
kubectl -n projecrtai set image deployment/projecrtai-web web=projecrtai:local
kubectl -n projecrtai rollout status deployment/projecrtai-web
```

Port-forward the service:

```bash
kubectl -n projecrtai port-forward service/projecrtai-web 8080:80
```

Open:

```text
http://127.0.0.1:8080
```

For a registry-backed deployment, tag and push the image:

```bash
docker tag projecrtai:local ghcr.io/narudondev/projecrtai:latest
docker push ghcr.io/narudondev/projecrtai:latest
kubectl apply -k k8s
kubectl -n projecrtai rollout restart deployment/projecrtai-web
```

If your cluster has NGINX Ingress, update `k8s/ingress.yaml` with your real host and apply:

```bash
kubectl apply -k k8s
```

## GitHub Actions

Workflow files are located at:

```text
.github/workflows/ci.yml
.github/workflows/deploy-pages.yml
```

### CI

The CI workflow runs automatically on:

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

### Deploy To GitHub Pages

The deploy workflow builds the frontend and publishes `client/dist` with GitHub Pages Actions.

It runs automatically on:

- Push to `main` or `master`
- Manual run from the GitHub Actions tab

Important: GitHub Pages is static hosting. It deploys the React frontend only. The Express backend is not deployed by this workflow.

To enable GitHub Pages:

1. Open the GitHub repository.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Go to the `Actions` tab.
5. Run `Deploy GitHub Pages` manually, or push to `master`.

After a successful deploy, GitHub shows the published URL in the workflow summary. For this repository, it will typically be:

```text
https://narudondev.github.io/ProjecrtAI/
```

If the URL shows `404 There isn't a GitHub Pages site here`, check these items:

1. `Settings` -> `Pages` -> `Source` must be `GitHub Actions`.
2. The `Deploy GitHub Pages` workflow must finish successfully.
3. Wait 1-3 minutes after the workflow succeeds before refreshing the Pages URL.
4. Use the exact repository path: `/ProjecrtAI/`.

If the workflow cannot deploy, check:

1. `Settings` -> `Actions` -> `General`.
2. Under `Workflow permissions`, select `Read and write permissions`.
3. Rerun `Deploy GitHub Pages`.

## Project Layout

```text
client/                 React + Vite app
server/                 Express API and production static server
.github/workflows/      GitHub Actions workflow files
```
