FROM circleci/node:latest-browsers

WORKDIR /usr/src/app/
USER root
COPY package.json ./
RUN npx nrm use taobao
RUN yarn

COPY ./ ./

# RUN npm run test:all

# RUN npm run fetch:blocks

CMD ["npm", "run", "build"]