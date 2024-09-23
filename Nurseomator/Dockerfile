FROM oven/bun AS build

WORKDIR /app

COPY packages/ ./packages/
COPY package.json package.json
COPY bun.lockb bun.lockb
COPY apps/server/package.json apps/server/package.json

WORKDIR /app/apps/server
RUN bun install

COPY apps/server/src ./src

ENV NODE_ENV=production

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts


FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/apps/server/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000