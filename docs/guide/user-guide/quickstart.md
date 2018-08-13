# Getting Started
Launch a simple GraphPipe model server that is serving squeezenet on CPU:

```bash
  docker run -it --rm \
        -e https_proxy=${https_proxy} \
        -p 9000:9000 \
        graphpipe-tf:cpu \
        --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb \
        --listen=0.0.0.0:9000
```

To see metadata on this model:

```bash
  > curl localhost:9000
```

To make a request, install the python client:
```bash
  > pip install graphpipe-py
```

Finally, let's test an image against the model.

![image](_media/mug.png)

After you download the image, run this script:

[filename](_examples/_squeezenet_req.py ':include :type=code')
