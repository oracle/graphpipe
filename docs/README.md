# GraphPipe

> A Standardized, Efficient protocol for Dead Simple ML Model Serving

# What is it?
GraphPipe is a protocol and collection of software designed to
simplify machine learning model deployment and decouple it from
vendor-specific model implementations.

# Features
* A simple, minimalist specification based on Flatbuffers
* Simple, reference model servers for Tensorflow, Caffe2, and ONNX.  More
  implementations to come.
* Efficient client implementations in Go, Python, and Java.

# Getting Started
To launch a simple graphpipe model server that is serving squeezenet on CPU:

```
  > docker run -it --rm \
        -e https_proxy=${https_proxy} \
        -p 9000:9000 \
        graphpipe-tf:cpu \
        --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb \
        --listen=0.0.0.0:9000
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

[filename](_examples/_squeezenet_req.py ':include :type=code')

# Getting Involved
Interested in getting involved with GraphPipe?  See us on github...
