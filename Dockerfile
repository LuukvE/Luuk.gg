FROM node:14
ENV NODE_ENV production
WORKDIR /usr/src/client
COPY client/build ./build
WORKDIR /usr/src/api
COPY api/package*.json ./
RUN npm ci --only=production
COPY api .
EXPOSE 8080
CMD [ "npx", "ts-node", "src" ]
