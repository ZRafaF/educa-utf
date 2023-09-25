FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn install --production
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]