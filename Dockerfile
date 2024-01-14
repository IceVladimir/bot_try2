FROM ghcr.io/puppeteer/puppeteer:19.7.5

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
	PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
	
WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN chown -R node /app/node_modules

USER node

CMD ["node", "bot1.js"]