set dotenv-load

project_name := `grep ^APP_NAME= .env | cut -d '=' -f 2-`
version := `jq -r .version package.json`
docker_registry := `grep ^DOCKER_REGISTRY= .env | cut -d '=' -f2`
docker_build_platform := env_var_or_default("DOCKER_BUILD_PLATFORM","linux/amd64")
project_image := docker_registry+"/"+project_name

default: dev

dev:
    npm run dev

lint:
    npm run fmt

docker-lint:
    hadolint --ignore DL3018 docker/Dockerfile

docker-build: docker-lint
    docker build --platform {{docker_build_platform}} -t {{project_name}}:{{version}} --file docker/Dockerfile .
    docker tag {{project_name}}:{{version}} {{project_name}}:latest

docker-compose:
    docker compose --file docker/docker-compose.yml up

docker-push: docker-build
	docker tag {{project_name}}:{{version}} {{project_image}}:{{version}}
	docker push {{project_image}}:{{version}}

publish: docker-push
	cd ansible;	ansible-playbook -i hosts.yml --extra-vars="app_version={{version}}" -t publish playbook.yml
