variable "env" {
  type = string
  default = dev
}

variable "region" {
  type = string
  default = us-west-1
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
  default = "dimention-app"
}

variable "project" {
  type    = string
  default = "codenity"
}

variable "owner" {
  type    = string
  default = "application"
}

variable "function" {
  type    = string
  default = "lambda-function"
}
variable "service_version" {
  type    = string
  default = "1.0.0"
}
