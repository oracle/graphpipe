# Running Graphpipe Servers

Here is an example of serving a model that is accessible from a remote url:

## Local vs. Remote Model Serving
Unless you are using the Tensorflow SavedModel format, where the model is stored in a directory instead of an individual file, 
you have the option to load your models over a remote http/https url.

Because our recommend configuration runs the server from a docker image, you will need to use a volume mount 
in order to serve local files.  Here is an example of serving a local .pb model:

```bash
      wget https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb
      docker run -it --rm \
            -v $PWD:/models/ \ # mount the current directory into the container's /model/ path
            -p 9000:9000 \
            graphpipe-tf:cpu \
            --model=/models/squeezenet.pb \
            --listen=0.0.0.0:9000
```

## Serving Different Model Types
::: tabs remoteinf

- Tensorflow

    ```bash
      docker run -it --rm \
            -v $PWD:/models/ \
            -p 9000:9000 \
            graphpipe-tf:cpu \
            --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb \
            --listen=0.0.0.0:9000
    ```

- ONNX

    ```bash
      docker run -it --rm \
            -v $PWD:/models/ \
            -e https_proxy=${https_proxy} \
            -p 9000:9000 \
            graphpipe-tf:cpu \
            --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb \
            --listen=0.0.0.0:9000
    ```

- Caffe2

    ```bash
      docker run -it --rm \
            -v $PWD:/models/ \
            -e https_proxy=${https_proxy} \
            -p 9000:9000 \
            graphpipe-tf:cpu \
            --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb \
            --listen=0.0.0.0:9000
    ```

:::

## GPU Acceleration
For those wishing to deploy on GPU-accelerated CUDA hardware, we provide gpu builds for each of our servers.  In order
to make this work correctly, you need to install [nvidia-docker](https://github.com/NVIDIA/nvidia-docker), as well as 9.0+cudnn7.

::: tabs gpuaccel

- Tensorflow
    ```bash
      nvidia-docker run -it --rm \
            -p 9000:9000 \
            graphpipe-tf:gpu \
            --model=https://objectstorage.us-phoenix-1.oraclecloud.com/n/bmcskeppareuser/b/c4/o/squeezenet.pb \
            --listen=0.0.0.0:9000
    ```

- ONNX
    ```bash
      nvidia-docker run -it --rm \
            -v $PWD:/models/ \
            -p 9000:9000 \
            graphpipe-onnx:gpu \
            --model=/models/squeezenet.pb \
            --listen=0.0.0.0:9000
    ```

- CAFFE2
TODO: MAKE THIS CORRECT
    ```bash
      nvidia-docker run -it --rm \
            -v $PWD:/models/ \
            -p 9000:9000 \
            graphpipe-onnx:gpu \
            --model=/models/squeezenet.pb \
            --listen=0.0.0.0:9000
    ```

:::
