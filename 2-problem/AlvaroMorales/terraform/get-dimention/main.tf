

  # subir y desplegar
  resource "aws_lambda_function" "function_main" {
    depends_on = [aws_iam_role_policy_attachment.main_role_policy_attachment] 
    function_name = "${var.project}-${var.function_name}"
    s3_bucket        = "bucket-${var.env}-dimention-app-01"  # Nombre del bucket de S3
    s3_key           = "app.zip"     # Ruta en el bucket al archivo ZIP
    source_code_hash = filebase64sha256("../app.zip")
    runtime = "nodejs16.x"
    handler = "src/functions/get-dimention/handler.main"
    role = aws_iam_role.iam_for_lambda.arn

    environment {
      variables = {
        DYN_CODENITY_DIMENTION = "dyn-codenity-dimention"
      }
    }
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
    depends_on = [aws_iam_role.iam_for_lambda,aws_iam_policy.main_policy]
    role       = aws_iam_role.iam_for_lambda.name
    policy_arn = aws_iam_policy.main_policy.arn
  }

  # # se crea el recurso
  # resource "aws_api_gateway_resource" "gateway_resource" {
  #   rest_api_id = var.aws_api_gateway_rest_api_id
  #   parent_id = var.aws_api_gateway_rest_api_root
  #   path_part = "dimention" 
  # }

  resource "aws_api_gateway_resource" "gateway_resource_id_dimention" {
    rest_api_id = var.aws_api_gateway_rest_api_id
    parent_id   = var.aws_api_gateway_resource_id
    path_part   = "{id_dimention}"
  }

  # Crear un método HTTP GET para el recurso
  resource "aws_api_gateway_method" "method" {
    rest_api_id   = var.aws_api_gateway_rest_api_id
    resource_id   = aws_api_gateway_resource.gateway_resource_id_dimention.id
    http_method   = "GET"
    authorization = "NONE"
  }
  # incorporando función Lambda con el método API Gateway
  resource "aws_api_gateway_integration" "lambda" {
    depends_on = [aws_lambda_function.function_main]
    rest_api_id             = var.aws_api_gateway_rest_api_id
    resource_id             = aws_api_gateway_resource.gateway_resource_id_dimention.id
    http_method             = aws_api_gateway_method.method.http_method
    integration_http_method = "POST"
    type                    = "AWS"
    uri                     = aws_lambda_function.function_main.invoke_arn
    request_templates = {
    "application/json" = file("${path.module}/vtl/request.vtl") 
    }
  }
  resource "aws_api_gateway_integration_response" "lambda_response" {
    depends_on = [aws_api_gateway_integration.lambda]
    rest_api_id     = var.aws_api_gateway_rest_api_id
    resource_id     = aws_api_gateway_resource.gateway_resource_id_dimention.id
    http_method     = aws_api_gateway_method.method.http_method
    status_code     = "200"
    response_templates = {
      # "application/json" = file("${path.module}/response.vtl")
      "application/json" = file("${path.module}/vtl/response.vtl")
    }
  }

  # Opcional: Plantilla VTL para la respuesta del método
  resource "aws_api_gateway_method_response" "lambda_method_response" {
    rest_api_id = var.aws_api_gateway_rest_api_id
    resource_id = aws_api_gateway_resource.gateway_resource_id_dimention.id
    http_method = aws_api_gateway_method.method.http_method
    status_code = "200"

    response_models = {
      "application/json" = "Empty"  # Esto debe coincidir con el modelo de respuesta de tu función Lambda
    }
  }

  # invocar la función Lambda
  resource "aws_lambda_permission" "api_gw" {
    depends_on = [aws_lambda_function.function_main] 
    statement_id  = "AllowAPIGatewayInvoke"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.function_main.function_name
    principal     = "apigateway.amazonaws.com"

    # El ARN del stage de API
    source_arn = "${var.aws_api_gateway_rest_api_arn}/*/GET/dimention/{id_dimention}"
  }

