# Serving Tensorflow Models
Using Graphpipe, you can make your Tensorflow model available over the
network with minimal fuss.  There are several advantages to using our
graphpipe-tf server instead of tensorflow-serving:

* Very similar performance to tensorflow-serving (see charts)
* Achieves good performance without having to mess with tensorflow's
  bazel-driven build process
* Decouples clients from Tensorflow's protocol, while preserving performance 
* Small, hackable code base written in Golang

# Getting your model into the proper format
To make things as easy as possible, we support the two model formats:

* tensorflow-serving directory format (see https://www.tensorflow.org/serving/serving_basic)
* single-file .pb format.  If you are trying to productionize a Keras model,
  this is probably what you will use

# Converting a keras model
For those who like to use keras, we provide a tool to convert your h5 into the
 appropriate format:


```
show how to do this

```

# Serving a local file-based model
Models can be served from graphpipe-tf using either a local file or an
http/https url.


```
  # Network example
  > docker run -e "GP_MODEL=http://localhost:80/mymodel.pb" phx.ocir.io/bmcskeppareuser/ml/graphpipe-tf-cpu

  # Filesystem example
  > docker run -v models:/models/ -e "GP_MODEL=/models/mymodel.pb" phx.ocir.io/bmcskeppareuser/ml/graphpipe-tf-cpu
```
