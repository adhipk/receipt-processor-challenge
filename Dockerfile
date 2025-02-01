FROM denoland/deno

EXPOSE 8000

WORKDIR /app

ADD ./src /app

RUN deno install --entrypoint main.ts

CMD ["run", "--allow-net", "main.ts"]