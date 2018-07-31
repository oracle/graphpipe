# graphpipe-tf Reference

## Overview ##

`graphpipe-tf` is a simple tensorflow model server written in Go. It
supports both the tensorflow SavedModel format as well as the GraphDef format.

## Building From Source ##

Instructions for building `graphpipe-tf` can be found on
[github](https://github.com/oracle/graphpipe-go/tree/master/cmd/graphpipe-tf).

## Server Options ##

The `graphpipe-tf` binary has the following runtime flags:

```bash
Required Flags:
  -m, --model string       tensorflow model to load.  Accepts local file or http(s) url.

Optional Flags:
  -c, --cache              enable results caching
  -d, --cache-dir string   directory for local cache state (default "~/.graphpipe")
  -h, --help               help for graphpipe-tf
  -i, --inputs string      comma seprated default inputs
  -l, --listen string      listen string (default "127.0.0.1:9000")
  -o, --outputs string     comma separated default outputs
  -v, --verbose            verbose output
  -V, --version            show version
```

Additionally, you may use the following environment variables:

```bash
GP_OUTPUTS                comma seprated default inputs
GP_INPUTS                 comma seprated default outputs
GP_MODEL                  tensorflow model to load.  Accepts local file or http(s) url.
GP_CACHE                  enable results caching
```
