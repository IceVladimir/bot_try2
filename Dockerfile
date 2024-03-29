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

RUN npm install --global --quiet --no-progress --unsafe-perm
RUN npm install express
RUN npm install node_characterai_edited2

RUN npm install -g pm2

RUN rm /etc/apt/sources.list.d/google-chrome.list
RUN apt-get update -y
RUN apt-get upgrade -y

RUN apt-get install -y nginx

COPY . .

RUN iptables -A INPUT -p tcp --dport 80 -j ACCEPT
RUN iptables-save

RUN docker run -it --rm -d -p 3001:80 --name web nginx
CMD ["pm2", "start", "bot1.js"]