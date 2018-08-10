# Server installation
While we provide full source code for our servers, such that you
can build your own binaries for your preferred platform, we make it 
easy to use our published Docker images out-of-the-box.

Although it is possible for you to convert your model to a common
format (like ONNX) before serving, we provide servers compatible with
the most common formats.  Further, rather than providing a single
monolithic server for all formats, our goal is to provide multiple,
smaller servers to maximize the simplicity of the code; if there is 
community demand for a monolithic server, we may consider implementing
that in the future.

## Installation of GPU server
::: tabs installgpu

- Tensorflow Server

    ```bash
    docker pull ...
    ```

- ONNX/Caffe2 Server

    ```bash
    docker pull ...
    ```

:::

## Installation of CPU server


::: tabs installcpu

- Tensorflow Server

    ```bash
    docker pull ...
    ```

- ONNX/Caffe2 Server

    ```bash
    docker pull ...
    ```

:::
