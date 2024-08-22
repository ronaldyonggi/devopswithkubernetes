FROM node:22-bookworm-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN useradd -m appuser && \
    chown -R appuser .

USER appuser
CMD ["node", "index.js"]