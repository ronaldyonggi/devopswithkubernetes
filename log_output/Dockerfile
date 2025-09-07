FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install only production dependencies to reduce image size
RUN npm install --only=production

COPY . .

# RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# RUN chown appuser .

# USER appuser

CMD ["node", "index.js"]