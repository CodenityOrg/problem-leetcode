FROM node:20-alpine3.18

ARG awsKey
ARG awsSecret
ARG awsSessionToken

RUN apk update
RUN apk upgrade
RUN yarn global add @nestjs/cli

ENV AWS_ACCESS_KEY_ID $awsKey
ENV AWS_SECRET_ACCESS_KEY $awsSecret
ENV AWS_SESSION_TOKEN $awsSessionToken

COPY ./script/init.sh /script/init.sh

WORKDIR /script
CMD [ "sh", "./init.sh" ]