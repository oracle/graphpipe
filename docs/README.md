# GraphPipe

> A Standardized, Efficient protocol for Dead Simple ML Model Serving

# What is it?
GraphPipe is a protocol and collection of software designed to
simplify machine learning model deployment and decouple it from
vendor-specific model implementations.

# Features
* A simple, minimalist specification based on Flatbuffers
* Dead-simple model servers for Tensorflow, Caffe2, and ONNX.  More
  implementations to come.
* Efficient client implementations in Go, Python, and Java.

# Getting Started
To launch a simple graphpipe model server that is serving resnet18 on CPU:

```
  > docker run xyz
```

To see metadata on this model:

```
  > curl localhost:9000
```

To make a request, install the python client:
```
  > pip install graphpipe-py
```

Finally, let's test an image against the model.

![image](_media/mug.png)

After you download the image, run this script:

```
import numpy as np
import requests

from graphpipe import remote

data = np.array(Image.open("mug.png"))
data = data.reshape([1] + list(data.shape))
data = np.rollaxis(data, 3, 1)  # channels first

pred = remote.execute("http://127.0.0.1:10000", data)
print("Predicted %d, expecting 504" % np.argmax(pred, axis=1))
```

# Getting Involved
Interested in getting involved with GraphPipe?  See us on github...
