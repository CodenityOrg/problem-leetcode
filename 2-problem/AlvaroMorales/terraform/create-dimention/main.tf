terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.20.0"
    }
  }
}
#configura la region a desplegar
provider "aws" {
  region = var.region
}


# subir y desplegar
resource "aws_lambda_function" "create" {
  function_name = var.function_name
  s3_bucket        = "bucket-${var.env}-${var.function_name}-01"  # Nombre del bucket de S3
  s3_key           = "app.zip"     # Ruta en el bucket al archivo ZIP
  source_code_hash = filebase64sha256("../../app.zip")
  runtime = "nodejs16.x"
  handler = "src/functions/create-dimention/handler.main"
  role = aws_iam_role.iam_for_lambda.arn
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "rol-${var.env}-${var.project}-${var.function_name}-01"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}
resource "aws_iam_policy" "main_policy" {
  name = "policy-${var.env}-${var.project}-${var.function_name}-01"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:Query",
          "dynamodb:DeleteItem",
          "kms:Decrypt",
          "kms:Encrypt",
          "secretsmanager:GetSecretValue"
        ],
        Resource = "*"
      },
      {
        Effect = "Allow",
        Action = [
          "logs:CreateLogStream",
          "logs:DescribeLogStreams",
          "logs:CreateLogGroup",
          "logs:PutLogEvents"
        ],
        Resource = "*"
      },
    ]
  })
}
resource "aws_iam_role_policy_attachment" "main_role_policy_attachment" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.main_policy.arn
}
#comenzamos con la configuracion para el gateway
resource "aws_api_gateway_rest_api" "gateway_main" {
  name = "gtw-${var.env}-${var.project}-${var.function_name}"
  description = "gateway dimention"
}

# se crea el recurso
resource "aws_api_gateway_resource" "gateway_resource" {
  rest_api_id = aws_api_gateway_rest_api.gateway_main.id
  parent_id = aws_api_gateway_rest_api.gateway_main.root_resource_id
  path_part = "dimention" 
}

# Crear un método HTTP GET para el recurso
resource "aws_api_gateway_method" "create" {
  rest_api_id   = aws_api_gateway_rest_api.gateway_main.id
  resource_id   = aws_api_gateway_resource.gateway_resource.id
  http_method   = "POST"
  authorization = "NONE"
}
# incorporando función Lambda con el método API Gateway
resource "aws_api_gateway_integration" "lambda" {
  rest_api_id             = aws_api_gateway_rest_api.gateway_main.id
  resource_id             = aws_api_gateway_resource.gateway_resource.id
  http_method             = aws_api_gateway_method.create.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.create.invoke_arn
}

# invocar la función Lambda
resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.create.function_name
  principal     = "apigateway.amazonaws.com"

  # El ARN del stage de API
  source_arn = "${aws_api_gateway_rest_api.gateway_main.execution_arn}/*/*"
}

