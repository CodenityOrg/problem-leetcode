
# Variables
AWS_REGION="us-east-1"
REPOSITORY_NAME="problem-3-alvaro-morales-codenity"
IMAGE_TAG="latest"

# Obtener el ID de la cuenta de AWS
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Construir la imagen de Docker
docker build -t ${REPOSITORY_NAME}:${IMAGE_TAG} .

# Crear el repositorio en ECR si no existe
aws ecr describe-repositories --repository-names ${REPOSITORY_NAME} || aws ecr create-repository --repository-name ${REPOSITORY_NAME}

# Iniciar sesión en ECR
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

# Etiquetar la imagen
docker tag ${REPOSITORY_NAME}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPOSITORY_NAME}:${IMAGE_TAG}

# Subir la imagen a ECR
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPOSITORY_NAME}:${IMAGE_TAG}
