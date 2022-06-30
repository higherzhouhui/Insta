FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY next.config.js ./next.config.js
COPY server.js ./server.js
COPY tsconfig.json ./tsconfig.json
COPY .babelrc ./.babelrc
COPY .env.development ./.env.development
COPY .env.production ./.env.production
COPY .env.test ./.env.test
COPY global.d.ts ./global.d.ts
COPY next-auth.d.ts ./next-auth.d.ts
COPY next-env.d.ts ./next-env.d.ts


COPY pages ./pages
COPY components ./components
COPY config ./config
COPY context ./context
COPY ethers-react ./ethers-react
COPY hooks ./hooks
COPY public ./public
COPY services ./services
COPY store ./store
COPY styles ./styles
COPY types ./types
COPY uikit ./uikit
COPY utils ./utils

CMD ["yarn", "dev"]


