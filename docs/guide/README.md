# History

OCCA (like *oca*-rina) started off as a project in [Tim Warburton's group](https://www.paranumal.com/).
The group mainly worked high-order numerical methods, specifically on the algorithms to make them performant.
During that time, we mainly focused on GPGPU programming using OpenCL and CUDA.

We had wrappers for OpenCL and CUDA to test implementations, which we almost always had 2 almost identical codes to run on NVIDIA and AMD GPUs.
In the summer of 2014, we tried out merging the wrappers (+ a new OpenMP one) and use just-in-time (JIT) compilation to generate the kernels.
We still faced the problem that we had duplicate code for the kernels.

The first approach to solving this used compiler macros that were defined based on the backend.
If curious, this approach is still documented in the [original OCCA paper](https://arxiv.org/pdf/1403.0968.pdf)

```cpp
occaKernel void addVectors(occaKernelInfoArg,
                           const int occaVariable entries,
                           occaPointer const float *a,
                           occaPointer const float *b,
                           occaPointer float *ab) {
    occaOuterFor0{
      occaInnerFor0{
        int i = occaInnerId0 + (occaInnerDim0 * occaOuterId0)
        if(i < entries) {
          ab[i] = a[i] + b[i];
        }
      }
    }
  }
}
```
