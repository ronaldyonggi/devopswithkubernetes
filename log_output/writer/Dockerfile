FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN chown appuser .

USER appuser

CMD ["node", "index.js"]