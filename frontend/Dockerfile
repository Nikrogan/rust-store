FROM node:18-alpine AS base
WORKDIR /frontend
ADD package.json /frontend/
RUN npm instal --force
ADD . .
ENV NODE_ENV production
RUN npm run build

CMD [ "npm", "run", "prod" ]
EXPOSE 3000