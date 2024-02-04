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
#comenzamos con la configuracion para el gateway
resource "aws_api_gateway_rest_api" "gateway_main" {
  name = "gtw-${var.env}-codenity-dimention"
  description = "gateway dimention"
}
# se crea el recurso
  resource "aws_api_gateway_resource" "gateway_resource" {
    rest_api_id = aws_api_gateway_rest_api.gateway_main.id
    parent_id = aws_api_gateway_rest_api.gateway_main.root_resource_id
    path_part = "dimention" 
  }

module "module_create" {
  source = "./create-dimention"
  aws_api_gateway_rest_api_id = aws_api_gateway_rest_api.gateway_main.id
  aws_api_gateway_rest_api_arn = aws_api_gateway_rest_api.gateway_main.execution_arn
  aws_api_gateway_rest_api_root= aws_api_gateway_rest_api.gateway_main.root_resource_id
  aws_api_gateway_resource_id = aws_api_gateway_resource.gateway_resource.id
}

module "module_get" {
  source = "./get-dimention"
  aws_api_gateway_rest_api_id = aws_api_gateway_rest_api.gateway_main.id
  aws_api_gateway_rest_api_arn = aws_api_gateway_rest_api.gateway_main.execution_arn
  aws_api_gateway_rest_api_root= aws_api_gateway_rest_api.gateway_main.root_resource_id
  aws_api_gateway_resource_id = aws_api_gateway_resource.gateway_resource.id
}
module "module_delete" {
  source = "./delete-dimention"
  aws_api_gateway_rest_api_id = aws_api_gateway_rest_api.gateway_main.id
  aws_api_gateway_rest_api_arn = aws_api_gateway_rest_api.gateway_main.execution_arn
  aws_api_gateway_rest_api_root= aws_api_gateway_rest_api.gateway_main.root_resource_id
  aws_api_gateway_resource_id = aws_api_gateway_resource.gateway_resource.id
}

module "module_update" {
  source = "./update-dimention"
  aws_api_gateway_rest_api_id = aws_api_gateway_rest_api.gateway_main.id
  aws_api_gateway_rest_api_arn = aws_api_gateway_rest_api.gateway_main.execution_arn
  aws_api_gateway_rest_api_root= aws_api_gateway_rest_api.gateway_main.root_resource_id
  aws_api_gateway_resource_id = aws_api_gateway_resource.gateway_resource.id
}