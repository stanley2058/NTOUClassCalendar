FROM node:lts-alpine as base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY .env chromedriver ./
COPY public ./public

FROM base as build
RUN ["npm", "i"]
COPY . .
RUN ["npm", "i", "-g", "typescript"]
RUN ["tsc"]

FROM base as prod
ENV NODE_ENV=production
ENV SELENIUM_REMOTE_URL=http://chrome:4444/wd/hub
ENV MONGODB_URI=mongodb://ntou:ntou-calendar@mongodb:27017/Record?authSource=Record
RUN ["npm", "i"]
COPY --from=build /usr/src/app/dist/ .
CMD ["node", "index.js"]