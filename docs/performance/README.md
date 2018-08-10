# API

The API documentation is split into the library's core classes and concepts

#### [Properties](/api/properties)

Properties are used as a general way to store information, for example

::: tabs language

- C++
    ```cpp
    occa::properties props("mode: 'CUDA', device_id: 0");
    ```

- C
    ```c
    occaProperties props = occaCreatePropertiesFromString("mode: 'CUDA', device_id: 0");
    ```

:::

<md-icon class="transform-arrow">arrow_downward</md-icon>

```js
{
  mode: 'CUDA',
  device_id: 0,
}
```

#### [Device](/api/device)

Device objects are used to allocate memory and build kernels

::: tabs language

- C++
    ```cpp
    device.malloc(10 * sizeof(int));
    device.buildKernel("myfile.okl", "myKernel");
    ```

- C
    ```c
    occaDeviceMalloc(device, 10 * sizeof(int));
    occaDeviceBuildKernel(device, "myfile.okl", "myKernel");
    ```

:::

#### [Memory](/api/memory)

Memory objects hold memory in the device and can be used to copy data to/from the host

::: tabs language

- C++
    ```cpp
    mem.copyTo(ptr);
    mem.copyTo(ptr, 10 * sizeof(int));
    mem.copyFrom(ptr);
    ```

- C
    ```c
    occaMemoryCopyMemToPtr(mem, ptr, occaAllBytes    , 0, occaDefault);
    occaMemoryCopyMemToPtr(mem, ptr, 10 * sizeof(int), 0, occaDefault);
    occaMemoryCopyPtrToMem(ptr, mem);
    ```

:::

#### [Kernel](/api/kernel)

Kernel objects launch the JIT compiled backend kernels

::: tabs language

- C++
    ```cpp
    myKernel(10, mem);
    ```

- C
    ```c
    occaKernelRun(myKernel,
                  10, mem);
    ```

:::

#### [Stream](/api/stream)

Streams represent work queues in the device which, depending on the backend, could be run in parallel

::: tabs language

- C++
    ```cpp
    device.setStream(streamA);
    myKernel(10, memA);
    // Switch streams
    device.setStream(streamB);
    myKernel(10, memB);
    ```

- C
    ```c
    occaDeviceSetStream(device, streamA);
    occaKernelRun(myKernel,
                  10, memA);
    // Switch streams
    occaDeviceSetStream(device, streamB);
    occaKernelRun(myKernel,
                  10, memB);
    ```

:::

#### [Background Device](/api/background-device)

All methods found in the [device](/api/device) can be called from the `occa` namespace using the _background device_

::: tabs language

- C++
    ```cpp
    occa::setDevice("mode: 'CUDA', device_id: 0");
    occa::malloc(10 * sizeof(int));
    occa::buildKernel("myfile.okl", "myKernel");
    ```

- C
    ```c
    occaSetDevice("mode: 'CUDA', device_id: 0");
    occaMalloc(10 * sizeof(int));
    occaBuildKernel("myfile.okl", "myKernel");
    ```

:::
