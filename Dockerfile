FROM node:22-alpine AS base

RUN apk add --no-cache python3 make g++

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Allow pnpm to be used
RUN corepack enable

COPY . /app
WORKDIR /app

# TODO: This doesn't seem to work yet because prisma hacks stuff into node_modules
# FROM base AS prod-deps
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# TODO: this shouldn't be necessary normally but prisma's postinstall is not running in this environment
RUN pnpm prisma generate
RUN pnpm run build

FROM base
COPY --from=build /app/node_modules /app/node_modules

COPY --from=build /app/build /app/build
EXPOSE 3000
CMD ["pnpm", "run", "start"]