variable "env" {
  type = string
  default = "dev"
}

variable "region" {
  type = string
  default = "us-east-1"
}

variable "memory_size" {
  type    = number
  default = 128
}

variable "timeout" {
  type    = number
  default = 5
}

variable "function_name" {
  type = string
  default = "dimention-create-app"
}

variable "project" {
  type    = string
  default = "codenity"
}

variable "owner" {
  type    = string
  default = "application"
}

variable "service_version" {
  type    = string
  default = "1.0.0"
}
