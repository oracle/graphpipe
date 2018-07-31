# Serving ONNX and caffe2 models
At present, the options for serving onnx and caffe2 models over the network are
somewhat limited.  The primary open source server of which we are aware is 
mxnet-model-server, which is a python+json inference server.

Here are some of the benefits of serving your onnx/caffe2 models with graphpipe:

* Efficient (and standardized) protocol - our Flatbuffers based protocol 
  is -much- faster than json, which makes it suitable for broader array of
  use cases.
* Simpler deployment - graphpipe-onnx is written in golang and c++, which has
  fewer dependencies than a python-based server.
* Future-proof protocol - machine learning model formats like onnx and caffe2
  are undergoing rapid development.  However, the transport protocol that
  connects your app to machine learning models should not need to.

# What's the difference between ONNX and caffe2 models
Although ONNX and caffe2 are different model formats, internally, our
implementation converts ONNX models into caffe2 models before serving them;
the caffe2 library is used to perform this conversion.

One thing to be aware of is that caffe2 models that are converted to 
onnx end up with different input/output names.  We'll illustrate that below.


# Getting your model into the proper format
Our graphpipe-onnx server supports 2 model formats, each with slightly different
requirements.

For onnx models, you need to specify:

* --model - onnx model you want to run
* --value_inputs - a json discription of the models value_inputs


For caffe2 models, we support NetDef format:

* --init_net - your caffe2 init_net NetDef 
* --predict_net - your caffe2 predict_net NetDef 
* --value_inputs - a json discription of the model's value_inputs

If you have a pytorch model, saving an onnx model is pretty simple.  Here is
an example of how to save resnet18 as an onnx model in pytorch:

```
from torch.autograd import Variable
import torch.onnx
import torchvision

# Construct a dummy input variable
dummy_input = Variable(torch.randn(1, 3, 224, 224))
# Obtain your model, it can be also constructed in your script explicitly
model = torchvision.models.resnet18(pretrained=True)

# Invoke export
torch.onnx.export(model, dummy_input, "resnet18.onnx", input_names=["input"],
                  output_names=['output'])
```

# Running your model
Models can be served from graphpipe-tf using either a local file or an
http/https url.


```
  # Network example
  ...TODO

  # Filesystem example
  ...TODO
```
