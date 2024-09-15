FROM --platform=linux/arm64 node:18
ARG awsKey
ARG awsSecret
WORKDIR /app

# Copiar package.json y package-lock.json (o yarn.lock) desde la carpeta app
COPY app/package*.json ./
# COPY ../app/yarn.lock ./

# Instalar dependencias
RUN yarn install --frozen-lockfile

# Copiar el resto de los archivos de la aplicación desde la carpeta app
COPY app .

# Instalar NestJS CLI globalmente
RUN yarn global add @nestjs/cli

# Construir la aplicación
RUN yarn build

ENV AWS_ACCESS_KEY_ID $awsKey
ENV AWS_SECRET_ACCESS_KEY $awsSecret

CMD ["yarn", "start:prod"]