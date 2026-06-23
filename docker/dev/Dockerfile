# Dev image — build from repo root:
#   docker build -f docker/dev/Dockerfile -t paymount-dev .
# Run with source mounted for hot reload:
#   docker run -p 5173:5173 -v ${PWD}:/app -v /app/node_modules paymount-dev

FROM node:22-alpine
WORKDIR /app

# npm install (not ci) — lock generated on Windows may lack Linux optional deps
COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5173

# --host so the Vite dev server is reachable from outside the container
CMD ["npm", "run", "dev", "--", "--host"]
