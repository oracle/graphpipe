# graphpipe flatbuffers

This repo holds the schema and build code to generate the language-specific
implementations of graphpipe's flatbuffers.

## Build

If you've got flatc installed you can just `make all` but if you don't want
to install it, you can `export USE_DOCKER=1` and then `make all`. (Remember,
make needs vars exported, not just on the command-line where you run make).

This will produce the go, c, and python libraries, which can then be copied
into their projects graphpipe-go, graphpipe-tf-py, and graphpipe-py,
respectively.

## Open Source Projects Using Graphpipe

Right now we've written a few libraries, and a couple implementations:

  - https://github.com/oracle/graphpipe-go is the Go helper library.
  - https://github.com/oracle/graphpipe-go/tree/master/cmd/graphpipe-tf is
    a Go implementation of a graphpipe server that makes TensorFlow queries
    against a provided model.
  - https://github.com/oracle/graphpipe-py is the Python helper library.
  - https://github.com/oracle/graphpipe-tf-py is a Python implementation of
    a remote operation client for TensorFlow as well as some example server
    implementations.
