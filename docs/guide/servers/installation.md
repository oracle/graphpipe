# Server installation
While we provide full source code for our servers, such that you can build your
own binaries for your preferred platform, we make it easy to use our published
Docker images out-of-the-box.  Note that while "official" images are coming
soon, the following community images are available.

## Installation of CPU server

::: tabs installcpu

- Tensorflow

    ```bash
    docker pull sleepsonthefloor/graphpipe-tf:cpu
    ```

- ONNX/Caffe2

    ```bash
    docker pull sleepsonthefloor/graphpipe-onnx:cpu
    ```

- Tensorflow + Oracle Linux

    ```bash
    docker pull sleepsonthefloor/graphpipe-tf:oraclelinux-cpu
    ```

- ONNX/Caffe2 + Oracle Linux

    ```bash
    docker pull sleepsonthefloor/graphpipe-onnx:oraclelinux-cpu
    ```
:::


## Installation of GPU server
::: tabs installgpu

- Tensorflow

    ```bash
    docker pull sleepsonthefloor/graphpipe-tf:gpu
    ```

- ONNX/Caffe2

    ```bash
    docker pull sleepsonthefloor/graphpipe-onnx:gpu
    ```

:::
