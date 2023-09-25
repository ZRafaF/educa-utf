FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
ENV NODE_ENV=production
ENV PB_URL https://educautf.td.utfpr.edu.br/db
ENV ANALYZE false
RUN yarn install --production
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]