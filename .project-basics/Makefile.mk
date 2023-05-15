DC=docker-compose
args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

.DEFAULT_GOAL := help
.PHONY: help

help:  ##Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

build:
	$(DC) up -d --build

up: ##Start Docker
	$(DC) up -d

do: ##Stop Docker
	$(DC) down
