FROM ghcr.io/puppeteer/puppeteer:19.7.5

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
	PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
	
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set unsafe-perm true

RUN npm install --force

COPY . /usr/src/app

RUN chown -R node /usr/src/app/node_modules

USER node

CMD ["node", "bot1.js"]