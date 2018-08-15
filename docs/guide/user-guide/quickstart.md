# Getting Started

To get started, let's see how to deploy a tensorflow model and communicate with
it via python.

First, launch a simple GraphPipe model server that is serving squeezenet on
CPU:

```bash
docker run -it --rm \
    -e https_proxy=${https_proxy} \
    -p 9000:9000 \
    sleepsonthefloor/graphpipe-tf:cpu \
    --model=https://oracle.github.io/graphpipe/models/squeezenet.pb \
    --listen=0.0.0.0:9000
```

To see metadata about this model:

```bash
curl localhost:9000
```

To make a request, install the python client and dependencies:

```bash
pip install graphpipe
pip install pillow # needed for image manipulation
```

Finally, let's test an image against the model. Right click and download the
[following image](https://oracle.github.io/graphpipe/guide/user-guide/_media/mug227.png):

![image](_media/mug227.png)

After you download the image, run this script:

[filename](_examples/_squeezenet_req.python ':include :type=code')

You should see that your image was correctly classified as a Coffee mug.
Congratulations!
