# Production image — build from repo root:
#   docker build -f docker/prod/Dockerfile -t paymount .

FROM node:22-alpine AS deps
WORKDIR /app
# npm install (not ci) — lock generated on Windows may lack Linux optional deps
COPY package.json package-lock.json ./
RUN npm install

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Static SPA served by nginx
FROM nginx:1.27-alpine AS runner
COPY docker/prod/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
