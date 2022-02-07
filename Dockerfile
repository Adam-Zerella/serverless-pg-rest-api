# Build it
FROM docker.io/node:lts-alpine AS builder
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY src ./src
RUN yarn install
RUN yarn build
# We run this to drop development dependencies needed for install i.e TypeScript.
RUN yarn install --production



# Run it
FROM docker.io/node:lts-alpine
WORKDIR /opt/app
RUN apk -U add --no-cache
COPY --from=builder node_modules/ ./node_modules
COPY --from=builder dist/ ./dist
COPY --from=builder  package.json ./
EXPOSE 5000
HEALTHCHECK CMD curl --fail http://127.0.0.1:5000/v1/healthzzz || exit 1
CMD [ "node", "dist/server.js" ]
