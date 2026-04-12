# Stage 1: Build React client
FROM node:18-alpine AS client-build

WORKDIR /app/client

COPY client/package.json ./
RUN npm install --legacy-peer-deps

COPY client/ ./
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build


# Stage 2: Run Express server
FROM node:18-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY . .
COPY --from=client-build /app/client/build ./client/build

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=400

EXPOSE 3000

CMD ["node", "server.js"]
