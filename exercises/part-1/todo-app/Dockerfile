FROM node:22-bookworm-slim AS build-stage

WORKDIR /usr/src/app

# Copy and install required dependencies
COPY package*.json ./
RUN npm install

# Then copy everything
COPY . .

# Then build
RUN npm run tsc

# New stage for production
FROM node:22-bookworm-slim

WORKDIR /usr/src/app

COPY --from=build-stage /usr/src/app/package*.json ./
RUN npm ci

COPY --from=build-stage /usr/src/app/build ./

RUN useradd -m appuser && \
    chown -R appuser .

USER appuser
CMD ["node", "index.js"]