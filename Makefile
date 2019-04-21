.DEFAULT_GOAL := interactive
.DEV_IMAGE := cwa
.PROD_IMAGE := cwa-production

.EXPOSED_PORT := 8080
.LINKED_PORT := 8080

.WORKSPACE_VOLUMES := \
	-v $(PWD)/public:/www/public \
	-v $(PWD)/src:/www/src

.ENVIROMENT_VARIABLES := \
	-e PORT=$(.EXPOSED_PORT)

help:
	@echo ""
	@echo " Battleship Game CWA [ client web application ] "
	@echo "------------------------------------------------"
	@echo ""
	@echo " make help\t\tdisplay help"
	@echo " make\t\t\talias for 'make $(.DEFAULT_GOAL)'"
	@echo " make dev-image\t\tbuild docker image [$(.DEV_IMAGE)] - require sync of src|public directories"
	@echo " make prod-image\tbuild docker image [$(.PROD_IMAGE)]"
	@echo " make build\t\tgenerate static assets into $(PWD)/build directory"
	@echo " make test\t\texecute unit and functional tests"
	@echo " make interactive\tprepares local dev. env., CWA become available on http://localhost:$(.LINKED_PORT)"
	@echo " make production\tprepares local prod. env., CWA become available on http://localhost:$(.LINKED_PORT)"
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
		$(.WORKSPACE_VOLUMES) \
		-v $(PWD)/build:/www/build \
		$(.ENVIROMENT_VARIABLES) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run build

test: dev-image
	docker run \
		--rm \
		-it \
		$(.WORKSPACE_VOLUMES) \
		$(.ENVIROMENT_VARIABLES) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run test

interactive: dev-image
	docker run \
		--rm \
		-it \
		$(.WORKSPACE_VOLUMES) \
		$(.ENVIROMENT_VARIABLES) \
		-p $(.LINKED_PORT):$(.EXPOSED_PORT) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run start

production: build prod-image
	docker run \
		--rm \
		-it \
		$(.ENVIROMENT_VARIABLES) \
		-e NO_UPDATE_CHECK=1 \
		-p $(.LINKED_PORT):$(.EXPOSED_PORT) \
		--entrypoint=/usr/bin/serve \
		$(.PROD_IMAGE)
