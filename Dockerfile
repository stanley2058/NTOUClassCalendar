FROM node:lts-alpine as base
WORKDIR /usr/src/app
COPY .env .
COPY package.json package-lock.json ./

FROM base as build
RUN ["npm", "i"]
COPY . .
RUN ["npm", "i", "-g", "typescript"]
RUN ["tsc"]

FROM base as prod
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb://ntou:ntou-calendar@mongodb:27017/Record?authSource=Record
RUN ["npm", "i"]
COPY --from=build /usr/src/app/dist/ .
CMD ["node", "index.js"]