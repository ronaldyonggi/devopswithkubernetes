# Build step
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy the rest of the code
COPY . .

# Final Image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy dependencies from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy souce code from the builder stage
COPY --from=builder /usr/src/app .

# Create and switch to non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN chown appuser .

USER appuser

CMD ["node", "index.js"]