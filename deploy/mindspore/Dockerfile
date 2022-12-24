FROM gplane/pnpm as Builder

RUN mkdir -p /home/happy-new-year/web
WORKDIR /home/happy-new-year/web
COPY . /home/happy-new-year/web

RUN pnpm install

RUN pnpm build:mindspore

FROM nginx:1.20.0

COPY --from=Builder /home/happy-new-year/web/dist/minspore /usr/share/nginx/html/
RUN chmod -R 755 /usr/share/nginx/html
COPY ./deploy/mindspore/nginx.conf /etc/nginx/nginx.conf


ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]

