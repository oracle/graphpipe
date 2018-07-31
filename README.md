<img
    src="./docs/assets/logo.png"
    width="500"
    style="display: block; width: 500px; margin: auto; margin-bottom: 3em"
/>

# GraphPipe

> Dead Simple ML Model Serving via a Standard Protocol

# What is it?

GraphPipe is a protocol and collection of software designed to simplify machine
learning model deployment and decouple it from vendor-specific model
implementations.

The existing solutions for model serving are inconsistent and/or inefficient.
There is no consistent protocol for communicating with these model servers so
it is often necessary to build custom clients for each workload. GraphPipe
solves these problems by standardizing on an efficient communication protocol
and providing simple model servers for the major ML frameworks.

We hope that open sourcing GraphPipe makes the model serving landscape a
friendlier place.  See more about why we built it
[here](https://oracle.github.io/graphpipe/#/guide/user-guide/overview).

Or browse the rest of the [documentation](https://oracle.github.io/graphpipe).

# Features

* A minimalist machine learning transport specification based on [flatbuffers]
* Simple, efficient reference model servers for [Tensorflow], [Caffe2], and [ONNX].
* Efficient client implementations in Go, Python, and Java.

[flatbuffers]: https://google.github.io/flatbuffers/
[Tensorflow]: https://www.tensorflow.org
[Caffe2]: https://caffe2.ai
[ONNX]: https://onnx.ai

## Flatbuffers Source

In addition to documentation, this repository holds the schema and build code
to generate the language-specific implementations of graphpipe's flatbuffers.

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
  - https://github.com/oracle/graphpipe-go/tree/master/cmd/graphpipe-onnx is
    a Go implementation of a graphpipe server that serves ONNX and caffe2
    models.
  - https://github.com/oracle/graphpipe-py is the Python helper library.
  - https://github.com/oracle/graphpipe-tf-py is a Python implementation of
    a remote operation client for TensorFlow as well as some example server
    implementations.

## Contributing

All of the GraphPipe projects are open source. To find out how to contribute
see [CONTRIBUTING.md](CONTRIBUTING.md)

