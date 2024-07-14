data "aws_region" "main" {}

data "aws_ecr_repository" "ecr_problem3_codenity" {
  name = "problem-3-alvaro-morales-codenity"
}

data "aws_dynamodb_table" "dyn_activities" {
  name = "dyn-activities-problem-03"
}

data "aws_dynamodb_table" "dyn_user" {
  name = "dyn-user-problem-03"
}

data "aws_ami" "ecs_optimized" {
  filter {
    name   = "name"
    values = ["amzn2-ami-ecs-hvm-*-x86_64-ebs"]
  }

  most_recent = true
  owners      = ["amazon"]
}


data "aws_availability_zones" "available" { state = "available" }