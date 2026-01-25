# ===============================
# Stage 1: Build
# ===============================
FROM node:24.0.0-alpine as build

WORKDIR /app

# Accept build arguments from GitHub Actions
ARG PUBLIC_NODE_ENV=development
ARG PUBLIC_APP_NAME=Ucartz
ARG PUBLIC_APP_VERSION=1.0.0
ARG PUBLIC_API_BASE_URL=https://hm-uat.ucartz.com/api
ARG PUBLIC_WS_URL=wss://ws.example.com
ARG PUBLIC_URL=/
ARG PUBLIC_ENABLE_LOGS=true
ARG PUBLIC_GOOGLE_MAPS_API_KEY=

# Set as environment variables for Rsbuild to use during build
ENV PUBLIC_NODE_ENV=$PUBLIC_NODE_ENV
ENV PUBLIC_APP_NAME=$PUBLIC_APP_NAME
ENV PUBLIC_APP_VERSION=$PUBLIC_APP_VERSION
ENV PUBLIC_API_BASE_URL=$PUBLIC_API_BASE_URL
ENV PUBLIC_WS_URL=$PUBLIC_WS_URL
ENV PUBLIC_URL=$PUBLIC_URL
ENV PUBLIC_ENABLE_LOGS=$PUBLIC_ENABLE_LOGS
ENV PUBLIC_GOOGLE_MAPS_API_KEY=$PUBLIC_GOOGLE_MAPS_API_KEY


# Install Yarn latest using Corepack
RUN corepack enable
RUN corepack prepare yarn@latest --activate


# Copy only dependency manifests first (for build cache efficiency)
COPY package.json yarn.lock ./

RUN yarn config set nodeLinker node-modules

# ---- Docker-safe clean (NO lockfile deletion) ----
# RUN yarn clean-docker

# Install deps, fail if lockfile and manifest are out of sync
RUN yarn install

# Then bring in the rest of the source code
COPY . ./

# Run build command
RUN yarn build:uat


# ===============================
# Stage 2: Production stage with nginx
# ===============================
FROM nginx:alpine

# Copy built React static files from build stage to nginx html folder
# COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html
COPY ngnix.conf /etc/nginx/conf.d/default.conf

# Expose default nginx port
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
