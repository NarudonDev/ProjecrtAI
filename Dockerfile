FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json

RUN npm ci --workspaces

COPY client ./client
COPY server ./server

RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY package.json package-lock.json ./
COPY server/package.json ./server/package.json

RUN npm ci --workspace server --omit=dev && npm cache clean --force

COPY server ./server
COPY --from=build /app/client/dist ./client/dist

USER node

EXPOSE 5000

CMD ["npm", "run", "start", "--workspace", "server"]
