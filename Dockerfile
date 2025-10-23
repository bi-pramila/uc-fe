# Stage 1: Build stage (optional if building locally)
FROM node:24.0.0-alpine as build

WORKDIR /app

# Copy only dependency manifests first (for build cache efficiency)
COPY package.json yarn.lock ./

# Install deps, fail if lockfile and manifest are out of sync
RUN yarn install

# Then bring in the rest of the source code
COPY . ./

# Run build command
RUN yarn build



# Stage 2: Production stage with nginx
FROM nginx:alpine

# Copy built React static files from build stage to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose default nginx port
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
