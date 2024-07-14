# Variables
include .env

# Obtener el ID de la cuenta de AWS
AWS_ACCOUNT_ID=$(shell aws sts get-caller-identity --query Account --output text)
IMAGE_TAG=latest

.PHONY: all build push

all: build push

build:
	@echo "Construyendo la imagen de Docker con Docker Compose..."
	docker-compose build

push:
	@echo "Creando el repositorio en ECR si no existe..."
	aws ecr describe-repositories --repository-names ${container_name} || aws ecr create-repository --repository-name ${container_name}
	@echo "Iniciando sesión en ECR..."
	aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
	@echo "Etiquetando la imagen..."
	docker tag ${container_name}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${container_name}:${IMAGE_TAG}
	@echo "Subiendo la imagen a ECR..."
	docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${container_name}:${IMAGE_TAG}
