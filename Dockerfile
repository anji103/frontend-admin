ARG NODE_VERSION=20-alpine

# ==============================
# Dependencies
# ==============================
FROM node:${NODE_VERSION} AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci

# ==============================
# Builder
# ==============================
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN npm run build

# ==============================
# Runner
# ==============================
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# No public directory in your project, so don't copy it.

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
