FROM node:22-alpine
WORKDIR /app
COPY server.js ./server.js
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
USER node
CMD ["node", "server.js"]
RUN node -e "let a=[];for(let i=0;i<40;i++)a.push(Buffer.alloc(1e7,1));console.log('allocated 400MB')"
