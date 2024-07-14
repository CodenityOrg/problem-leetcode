SHELL = /bin/bash
.DEFAULT_GOAL := help

GIT_BRANCH = main
REP_HOME   = $(shell echo "$(shell pwd | rev | cut -d "/" -f1 | rev)")

ifeq ($(REP_HOME),matrix-script-shelltool)
GIT_HOME = $(shell echo "$(PWD)")
else
GIT_HOME = $(shell echo "$(PWD)/.shelltool")
endif

init:
	@rm -rf .shelltool/
	@git clone git@github.com:MATRIXMVP/matrix-script-shelltool.git -b ${GIT_BRANCH} .shelltool

# necesario para validaciones del repositorio shelltool
-include makefiles/*.mk

# necesario para la carga de procesos en repositorios clientes
-include .shelltool/makefiles/*.mk