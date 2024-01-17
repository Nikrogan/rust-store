FROM node:18-alpine AS base
WORKDIR /frontend
ADD package.json package.json
RUN npm instal --legacy-peer-deps
ADD . .
ENV NODE_ENV production
RUN npm run build
RUN npm prune --production

CMD [ "npm", "start" ]
EXPOSE 3000