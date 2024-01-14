FROM ghcr.io/puppeteer/puppeteer:19.7.5
USER node
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
	PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global


WORKDIR /usr/src/app

USER "${USER}"

COPY package*.json ./

RUN npm install --global --quiet --no-progress --unsafe-perm  \
    && npm cache clean --force
	
COPY . .
CMD ["node", "bot1.js"]