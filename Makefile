.DEFAULT_GOAL := interactive
.DEV_IMAGE := cwa
.PROD_IMAGE := cwa-production

.EXPOSED_PORT := 8080
.LINKED_PORT := 8080

.SHARED_VOLUMES := \
	-v $(PWD)/public:/www/public \
	-v $(PWD)/src:/www/src \
	-v $(PWD)/.env:/www/.env

.ENV_VARIABLES := \
	-e PORT=$(.EXPOSED_PORT)

help:
	@echo ""
	@echo " Battleship Game CWA [ client web application ] "
	@echo "------------------------------------------------"
	@echo ""
	@echo " make help\t\tdisplay help"
	@echo ""
	@echo "-- DOCKER IMAGE PREPARATION"
	@echo " make dev-image\t\tbuild [$(.DEV_IMAGE)] image which encapsulate dev-dependencies, nothing else"
	@echo " make prod-image\tbuild [$(.PROD_IMAGE)] image which encapsulate 'serve', nothing else"
	@echo ""
	@echo "-- COMMANDS"
	@echo " make\t\t\talias for 'make $(.DEFAULT_GOAL)'"
	@echo " make interactive\trun [$(.DEV_IMAGE)] image, content become available on http://localhost:$(.LINKED_PORT)"
	@echo " make production\trun [$(.PROD_IMAGE)] image, content become available on http://localhost:$(.LINKED_PORT)"
	@echo " make test\t\texecute unit and functional tests"
	@echo " make build\t\tgenerate static assets in './build' directory"
	@echo ""

dev-image:
	docker build -t $(.DEV_IMAGE) .

prod-image:
	docker build -t $(.PROD_IMAGE) . -f production.Dockerfile

build: dev-image
	mkdir $(PWD)/build -p
	docker run \
		--rm \
		-it \
		-v $(PWD)/build:/www/build \
		$(.SHARED_VOLUMES) \
		$(.ENV_VARIABLES) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run build

test: dev-image
	docker run \
		--rm \
		--name cwa-test \
		-it \
		$(.SHARED_VOLUMES) \
		$(.ENV_VARIABLES) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run test

interactive: dev-image
	docker run \
		--rm \
		--name cwa \
		-it \
		$(.SHARED_VOLUMES) \
		$(.ENV_VARIABLES) \
		-p $(.LINKED_PORT):$(.EXPOSED_PORT) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run start

production: build prod-image
	docker run \
		--rm \
		--name cwa-production \
		-it \
		-v $(PWD)/build:/www/build \
		-v $(PWD)/serve.json:/www/serve.json \
		-e NO_UPDATE_CHECK=1 \
		$(.ENV_VARIABLES) \
		-p $(.LINKED_PORT):$(.EXPOSED_PORT) \
		--entrypoint=serve \
		$(.PROD_IMAGE)
