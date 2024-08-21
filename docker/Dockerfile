FROM node:22.6 as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY src/ ./src
COPY tsconfig.json .
RUN npm run build

FROM node:22.6-slim
ENV NODE_ENV production
USER node
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit-dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD [ "node", "dist/src/index.js" ]
