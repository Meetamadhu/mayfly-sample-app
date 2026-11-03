FROM node:22-alpine
WORKDIR /app
COPY server.js ./server.js
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
USER node
CMD ["node", "server.js"]
