FROM node:16-alpine AS development
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:16-alpine AS application
WORKDIR /usr/app
COPY package*.json ./
COPY --from=development /usr/app/node_modules ./node_modules
COPY . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

FROM node:16-alpine AS prod
COPY --from=application /usr/app/node_modules ./node_modules
COPY --from=application /usr/app/dist ./dist
ENV PORT=4000
EXPOSE 4000
CMD ["node", "dist/main.js"]