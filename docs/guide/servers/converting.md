# Supported Model Formats

In order to serve models using GraphPipe, your model must be in one of our supported
formats.  

# Tensorflow Model Formats
If you are using Tensorflow, we support the two most common model formats:

* SavedModel format - the tensorflow-serving directory format (see https://www.tensorflow.org/serving/serving_basic)
* GraphDef (.pb) format.  If you are trying to productionize a Keras
  model, this is probably what you will use

#### Keras model conversion
It is very common for data scientists to first develop models using Keras before attempting to deploy them.  We provide 
a simple tool to convert your keras .h5 model into GraphDef .pb format, which can be invoked like so:

```bash
  docker run -v $PWD:/tmp/ graphpipe-h5topb:latest my_original_model.h5 my_converted_model.pb
```


# Caffe2/ONNX/Pytorch model formats
If you are using Caffe2 or Pytorch, you will likely be using one of the following formats:

* ONNX (.onnx) + value_inputs.json
* Caffe2 NetDef + value_inputs.json - in this case, your model has three files: init_net.pb, predict_net.pb, and value_inputs.json

#### Pytorch model conversion
If you are using Pytorch, see this guid on how to convert your model into ONNX or caffe2 format.
