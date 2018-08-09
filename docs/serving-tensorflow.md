# Serving Tensorflow Models
Using Graphpipe, you can make your Tensorflow model available over the
network with minimal fuss.  There are several advantages to using our
graphpipe-tf server instead of tensorflow-serving:

* Very similar performance to tensorflow-serving (see preformance charts)
* Achieves good performance without having to mess with tensorflow's
  bazel-driven build process
* Use Tensorflow as a backend, without having to build Tensorflow code
  into your clients
* Small, hackable code base written in Golang

# Getting your model into the proper format
To make things as easy as possible, we support two popular tensorflow model
formats:

* SavedModel format - the tensorflow-serving directory format (see https://www.tensorflow.org/serving/serving_basic)
* GraphDef (.pb) format.  If you are trying to productionize a Keras
  model, this is probably what you will use

# Converting a keras model
For those keras users, we provide a tool to convert your h5 into
 the GraphDef format.

```
  docker run -v $PWD:/tmp/ graphpipe-h5topb:latest my_original_model.h5 my_converted_model.pb
```

# Serving a model
Models can be served from graphpipe-tf using either a local file or an
http/https url.

Here is an example of serving a local model - we use a docker volume to mount 
access the model in the container's file system:
```
  > wget https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb
  > docker run -it --rm \
        -v $PWD:/models/ \
        -p 9000:9000 \
        graphpipe-tf:cpu \
        --model=/models/squeezenet.pb \
        --listen=0.0.0.0:9000
```

Here is an example of serving a model that is accessible from a remote url:

```
  > docker run -it --rm \
        -v $PWD:/models/ \
        -e https_proxy=${https_proxy} \
        -p 9000:9000 \
        graphpipe-tf:cpu \
        --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb \
        --listen=0.0.0.0:9000
```

# Connecting the remote server

Right click to download this image:

![image](_media/mug.png)

Using that image, you can now run inference against the squeezenet server:

[filename](_examples/_squeezenet_req.py ':include :type=code')
