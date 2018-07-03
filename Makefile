FLATC=flatc
ROOT=.

ifeq ('$(USE_DOCKER)', '1')
	ROOT=/src
	FLATC=docker run --rm -it \
		--user $$(id -u):$$(id -g) \
		-v $(PWD):/src neomantra/flatbuffers:v1.9.0 flatc
endif

all: cpp/graphpipe_generated.h go/graphpipe python/graphpipe

.PHONY: go python cpp

go: go/graphpipe

cpp: cpp/graphpipe_generated.h

python: python/graphpipe

cpp/graphpipe_generated.h:
	$(FLATC) --cpp -o $(ROOT)/cpp $(ROOT)/graphpipe.fbs

go/graphpipe:
	$(FLATC) --go -o $(ROOT)/go $(ROOT)/graphpipe.fbs

python/graphpipe:
	$(FLATC) --python -o $(ROOT)/python $(ROOT)/graphpipe.fbs
