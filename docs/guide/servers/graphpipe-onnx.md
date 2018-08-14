# graphpipe-onnx Reference

## Overview ##

`graphpipe-onnx` is a simple onnx/caffe2 model server written in Go. It
supports both the ONNX model format as well as the caffe2 NetDef format.

## Building From Source ##

Instructions for building `graphpipe-onnx` can be found on
[github](https://github.com/oracle/graphpipe-go/tree/master/cmd/graphpipe-onnx).

## Server Options ##

The `graphpipe-onnx` binary has the following runtime flags:

```bash
Required Flags for ONNX Models:
  -m, --model string          ONNX model to load.   Accepts local file or http(s) url.
      --value-inputs string   value_inputs.json for the model.  Accepts local file or http(s) url.

Required Flags for Caffe2 Models:
      --init-net string       init_net file to load
      --predict-net string    predict_net file to load.  Accepts local file or http(s) url.
      --value-inputs string   value_inputs.json for the model.  Accepts local file or http(s) url.

Optional Flags:
      --cache                 enable results caching
      --cache-dir string      directory for local cache state (default "~/.graphpipe")
      --disable-cuda          disable Cuda
      --engine-count int      number of caffe2 graph engines to create (default 1)
  -h, --help                  help for graphpipe-caffe2
  -l, --listen string         listen string (default "127.0.0.1:9000")
      --profile string        profile and write profiling output to this file
  -v, --verbose               enable verbose output
  -V, --version               show version
```

Additionally, you may use the following environment variables:

```bash
GP_OUTPUTS                comma seprated default inputs
GP_INPUTS                 comma seprated default outputs
GP_MODEL                  ONNX model to load.  Accepts local file or http(s) url.
GP_CACHE                  enable results caching
GP_INIT_NET               init_net file to load. Accepts local file or http(s) url.
GP_PREDICT_NET            predict_net file to load. Accepts local file or http(s) url.
GP_VALUE_INPUTS           value_inputs.json file to load. Accepts local file or http(s) url.
```
