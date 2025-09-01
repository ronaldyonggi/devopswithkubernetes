# Build step
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Install non-dev dependencies
RUN npm install --only=production

COPY . .

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app .  

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN chown appuser .

USER appuser

CMD ["node", "index.js"]