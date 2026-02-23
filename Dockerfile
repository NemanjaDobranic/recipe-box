FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]