FROM node:22.21.1

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev 

COPY . .

RUN npx prisma generate

CMD ["node", "index.js"]

EXPOSE 8080