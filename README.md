<img
    src="./docs/assets/logo.png"
    width="500"
    style="display: block; width: 500px; margin: auto; margin-bottom: 3em"
/>

# GraphPipe

> Machine Learning Model Deployment Made Simple

# What is it?

GraphPipe is a protocol and collection of software designed to simplify machine
learning model deployment and decouple it from framework-specific model
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

# What is in this repo?
This repo contains documentation as well as the flatubuffer definition files
that are used by other language specific repos.  If you are looking for
GraphPipe clients, servers, and example code, check out our other GraphPipe
repos:

  - https://github.com/oracle/graphpipe-go - the GraphPipe go client library
  - https://github.com/oracle/graphpipe-go/tree/master/cmd/graphpipe-tf -
    Go implementation of a GraphPipe TensorFlow model server
  - https://github.com/oracle/graphpipe-go/tree/master/cmd/graphpipe-onnx -
    a Go implementation a GraphPipe ONNX/Caffe2 model server
  - https://github.com/oracle/graphpipe-py - the GraphPipe client library for
    Python
  - https://github.com/oracle/graphpipe-tf-py  - a Python implementation of
    a remote operation client for TensorFlow, as well as some example server
    implementations

## Building flatbuffer definitions

If you've got flatc installed you can just `make all` but if you don't want
to install it, you can `export USE_DOCKER=1` and then `make all`. (Remember,
make needs vars exported, not just on the command-line where you run make).

This will produce the go, c, and python libraries, which can then be copied
into their projects graphpipe-go, graphpipe-tf-py, and graphpipe-py,
respectively.

## Contributing

All of the GraphPipe projects are open source. To find out how to contribute
see [CONTRIBUTING.md](CONTRIBUTING.md)

You can also chat us up on our [Slack Channel](https://join.slack.com/t/graphpipe/shared_invite/enQtNDE4MTUyODk2NzQzLTUwODlkZDRiYTI4NmE1OTA5NzRmNjk5MGZiY2M0ZDRiYzNiMTQ0ZmIxODYzZjY2NzRmNzM4NTI0OGVlZGYzZTA).
