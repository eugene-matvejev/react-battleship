.DEFAULT_GOAL := demo
.NODE_ALPINE_IMAGE := cwa-node.alpine
.CWA_IMAGE := cwa

.EXPOSED_PORT := 3000
.LINKED_PORT := 9000

.WORKSPACE_VOLUMES := \
	-v $(PWD)/public:/www/public \
	-v $(PWD)/src:/www/src \
	-v $(PWD)/README.md:/www/README.md \
	-v $(PWD)/LICENSE:/www/LICENSE

help:
	@echo " "
	@echo " Available commands: "
	@echo " ------------------- "
	@echo " "
	@echo "  make \t\t\t\t alias for make build"
	@echo "  make help \t\t\t displays current help"
	@echo "  make dependencies \t\t create build environment base image"
	@echo "  make build \t\t\t [default] triggers the component build"
	@echo "  make tests \t\t\t runs unit tests"
	@echo "  make demo \t\t\t creates the demo pages (triggered by the build command already)"
	@echo " "
	@echo "  make demo will make http://localhost:$(.LINKED_PORT)"
	@echo " "
	@echo " "

node.alpine:
	docker build -t $(.NODE_ALPINE_IMAGE) . -f node.alpine.Dockerfile

dependencies: node.alpine
	docker build -t $(.CWA_IMAGE) .

build: dependencies
	docker run \
		--rm  \
		-it  \
		$(.WORKSPACE_VOLUMES) \
		$(.CWA_IMAGE) -c 'npm run build'

test: dependencies
	docker run \
		--rm \
		-it \
		$(.WORKSPACE_VOLUMES) \
		--entrypoint /bin/sh \
		$(.CWA_IMAGE) -c 'npm test'

demo: dependencies
	docker run \
		--rm \
		-it \
		$(.WORKSPACE_VOLUMES) \
		--entrypoint /bin/sh \
		-p $(.LINKED_PORT):$(.EXPOSED_PORT) \
		$(.CWA_IMAGE) -c 'npm start'
