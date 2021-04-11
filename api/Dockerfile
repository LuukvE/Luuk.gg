FROM node:12-alpine
RUN apk add --no-cache python g++ make
WORKDIR /api
COPY . .
RUN npm install --production
CMD ["npm", "start"]