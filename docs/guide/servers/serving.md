# Running GraphPipe Servers

This page provides an overview on how to serve models using our reference
model servers, `graphpipe-tf` and `graphpipe-onnx`.

## Remote vs. Local Models

Unless you are using the Tensorflow SavedModel format, where the model is
stored in a directory instead of an individual file, you have the option to
load your models over a remote http/https url.  Here is an example of serving a
model that is accessible from a remote url:

```bash
docker run -it --rm \
      -p 9000:9000 \
      sleepsonthefloor/graphpipe-tf:cpu \
      --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb \
      --listen=0.0.0.0:9000
```

Because our recommended configuration runs the server from a docker image, you
will need to use a volume mount in order to serve local models.  Here is an
example of serving a local .pb model:

```bash
curl https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb > squeezenet.pb
docker run -it --rm \
        -v "$PWD:/models/"  \
        -p 9000:9000 \
        sleepsonthefloor/graphpipe-tf:cpu \
        --model=/models/squeezenet.pb \
        --listen=0.0.0.0:9000
```

## Serving Different Model Types

::: tabs cpu

- Tensorflow

    ```bash
    docker run -it --rm \
          -e https_proxy=${https_proxy} \
          -p 9000:9000 \
          sleepsonthefloor/graphpipe-tf:cpu \
          --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb \
          --listen=0.0.0.0:9000
    ```

- ONNX

    ```bash
    docker run -it --rm \
          -e https_proxy=${https_proxy} \
          -p 9000:9000 \
          sleepsonthefloor/graphpipe-onnx:cpu \
          --value-inputs=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.value_inputs.json \
          --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.onnx \
          --listen=0.0.0.0:9000
    ```

- Caffe2

    ```bash
    docker run -it --rm \
          -e https_proxy=${https_proxy} \
          -p 9000:9000 \
          graphpipe-onnx:cpu \
          --value-inputs=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.value_inputs_caffe2.json \
          --init-net=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.init_net.pb \
          --predict-net=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.predict_net.pb \
          --listen=0.0.0.0:9000
    ```

:::

## GPU Acceleration

For those wishing to deploy on GPU-accelerated CUDA hardware, we provide gpu
builds for each of our servers.  In order to make this work correctly, you need
to install [nvidia-docker](https://github.com/NVIDIA/nvidia-docker), as well as
cuda-9.0+cudnn7.

::: tabs gpu

- Tensorflow
    ```bash
    nvidia-docker run -it --rm \
          -e https_proxy=${https_proxy} \
          -p 9000:9000 \
          sleepsonthefloor/graphpipe-tf:gpu \
          --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb \
          --listen=0.0.0.0:9000
    ```

- ONNX
    ```bash
    nvidia-docker run -it --rm \
          -e https_proxy=${https_proxy} \
          -p 9000:9000 \
          sleepsonthefloor/graphpipe-onnx:gpu \
          --value-inputs=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.value_inputs.json \
          --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.onnx \
          --listen=0.0.0.0:9000
    ```

- CAFFE2
    ```bash
    nvidia-docker run -it --rm \
          -e https_proxy=${https_proxy} \
          -p 9000:9000 \
          sleepsonthefloor/graphpipe-onnx:gpu \
          --value-inputs=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.value_inputs_caffe2.json \
          --init-net=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.init_net.pb \
          --predict-net=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.predict_net.pb \
          --listen=0.0.0.0:9000
    ```

:::
