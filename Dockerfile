FROM node:4.2.2-wheezy

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt && ln -s /opt/node_modules /opt/app/

WORKDIR /opt/app

EXPOSE 3000

CMD ["node", "bin/www"]
