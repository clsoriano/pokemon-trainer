FROM node:14.18 as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app
RUN npm install
RUN npm run build:prod

FROM nginx:latest
COPY /nginx/pokemon-trainer.conf /etc/nginx/conf.d/pokemon-trainer.conf
RUN mkdir -p /usr/share/nginx/html/pokemon-trainer
COPY --from=build /usr/local/app/pokemon-trainer /usr/share/nginx/html/pokemon-trainer

EXPOSE 80