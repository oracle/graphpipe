# Supported Model Formats

In order to serve models using our example GraphPipe servers, your model must
be in a supported format.  

# Tensorflow Model Formats

If you are using Tensorflow, we support the two most common model formats:

* SavedModel format - the tensorflow-serving directory format ([see
  here](https://www.tensorflow.org/serving/serving_basic))
* GraphDef (.pb) format.  This is simply the graphdef serialized as a protobuf.
  If you are trying to productionize a Keras model, this is the easiest format
  to generate.

#### Keras model conversion

It is very common for data scientists to first develop models using Keras
before attempting to deploy them. The graphpipe-tf-py repository provides a
simple tool to convert your keras .h5 model into GraphDef .pb format. It has
been packaged into a docker container, which you can use like this:

```bash
curl https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.h5 > squeezenet.h5
docker run -v $PWD:/tmp/ sleepsonthefloor/graphpipe-h5topb:latest squeezenet.h5 converted_squeezenet.pb
```

# Caffe2/ONNX/Pytorch model formats

If you are using Caffe2 or Pytorch, you will likely be using one of the
following formats:

* ONNX (.onnx) + value_inputs.json
* Caffe2 NetDef + value_inputs.json - in this case, your model has three files:
  init_net.pb, predict_net.pb, and value_inputs.json

#### Pytorch model conversion

If you are using Pytorch, see [this
guide](https://pytorch.org/tutorials/advanced/super_resolution_with_caffe2.html)
on how to convert your model into ONNX or caffe2 format.

#### Caffe2 model conversion

You can find some tips on saving caffe2 models to NetDef format (init_net.pb +
predict_net.pb + value_inputs.json)
[here](https://github.com/caffe2/caffe2/issues/642).
