FROM node:10-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
USER node
#RUN npm ci --only=production
COPY --chown=node:node . .
EXPOSE 8055
CMD [ "npm", "start" ]