FROM node:22-alpine AS base
WORKDIR /app
ARG PNPM_HOME="/pnpm"
RUN corepack enable

FROM base AS build-deps
COPY ./package.json ./pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM build-deps AS build
COPY . /app

RUN pnpm build

FROM nginx AS server

COPY --from=build /app/dist /usr/share/nginx/html