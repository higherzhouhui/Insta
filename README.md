![image](https://github.com/wanghao12345/capsid-web/blob/wanghao/public/static/image/LOGO.png)

## Environment

-   Node.js >= 12.22.0 （recommend version is 16.13.1）
-   Install metaMask

## Getting Started

First, run the development server:

## npm i yarn -g

## yarn

## npm run build

## Docker

```bash
# 1、build
docker image build ./ -t [docker-name]:1.0.0
# or
docker build . -t [docker-name]
# 2、run
docker container create -p 3000:80 [docker-name]:1.0.0
docker container start xxx
# or
docker run -e PORT=3000 [docker-name]
# 3、
```

## Docker-componse

```bash
# 1、development
docker-compose up --build --force-recreate
# or cloud service
docker-compose up -d app

# 2、production
docker-compose -f docker-compose.production.yml up --build --force-recreate
# or cloud service
docker-compose -f docker-compose.production.yml up -d app

```
