FROM node:18-alpine AS base
WORKDIR /frontend
ADD ./frontend/package.json package.json
RUN npm instal --force
ADD ./frontend .
ENV NODE_ENV production
RUN npm run build

CMD [ "npm", "run", "prod" ]
EXPOSE 3000