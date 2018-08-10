# Command-Line Interface

OCCA comes with a command-line tool called `occa` inside the `bin` directory.
It also comes with bash autocomplete to help with finding cached files.

::: tabs os

- Linux
    ```bash
    . <(occa autocomplete bash)
    ```

- MacOS
    ```bash
      eval "$(occa autocomplete bash)"
    ```

:::

# Devices

We can use `occa info` to view enabled OCCA modes and descriptions for each device.

```bash
> occa info
==========o======================o==========================================
 CPU Info | Processor Name       | Intel(R) Core(TM) i5-4260U CPU @ 1.40GHz
          | Cores                | 4
          | Memory (RAM)         | 4 GB
          | Clock Frequency      | 1.4 GHz
          | SIMD Instruction Set | SSE4
          | SIMD Width           | 128 bits
          | L1 Cache Size (d)    |  32 KB
          | L2 Cache Size        | 256 KB
          | L3 Cache Size        |   3 MB
==========o======================o==========================================
 OpenCL   | Device Name          | Intel(R) Core(TM) i5-4260U CPU @ 1.40GHz
          | Driver Vendor        | Intel
          | Platform ID          | 0
          | Device ID            | 0
          | Memory               | 4 GB
          |----------------------|------------------------------------------
          | Device Name          | HD Graphics 5000
          | Driver Vendor        | Intel
          | Platform ID          | 0
          | Device ID            | 1
          | Memory               | 1 GB
==========o======================o==========================================
```

# Environment

We can use `occa env` to view the environment OCCA is using to run devices.
Environment variables override compiled-time defines.

```bash
> occa env
  Basic:
    - OCCA_DIR                   : /home/david/git/night
    - OCCA_CACHE_DIR             : /home/david/.occa
    - OCCA_VERBOSE               : [NOT SET]
  Makefile:
    - CXX                        : clang++
    - CXXFLAGS                   : -Wall -pedantic -Wnewline-eof -Wshadow -Wsign-compare -Wuninitialized -Wtype-limits -Wignored-qualifiers -Wempty-body -g
    - FC                         : gfortran
    - FCFLAGS                    : [NOT SET]
    - LDFLAGS                    : [NOT SET]
  Backend Support:
    - OCCA_OPENMP_ENABLED        : 0
    - OCCA_OPENCL_ENABLED        : 1
    - OCCA_CUDA_ENABLED          : 1
  Run-Time Options:
    - OCCA_CXX                   : clang++
    - OCCA_CXXFLAGS              : -g
    - OCCA_INCLUDE_PATH          : [NOT SET]
    - OCCA_LIBRARY_PATH          : [NOT SET]
    - OCCA_OPENCL_COMPILER_FLAGS : -I. -cl-single-precision-constant -cl-denorms-are-zero -cl-single-precision-constant -cl-fast-relaxed-math -cl-finite-math-only -cl-mad-enable -cl-no-signed-zeros
    - OCCA_CUDA_COMPILER         : nvcc
    - OCCA_CUDA_COMPILER_FLAGS   : -I. --compiler-options -O3 --use_fast_math
```

# Cache

Compiled kernels are cached in `${OCCA_CACHE_DIR}`, defaulting to `${HOME}/.occa`.
It is safe to clear the cache directory at anytime.

## Kernels

```bash
> occa clear --kernels
  Removing [/home/david/.occa/cache/*], are you sure? [y/n]:
```

## Library Kernels

```bash
> occa clear --lib myLibrary --lib myLibrary2
  Removing [/home/david/.occa/libraries/myLibrary/*], are you sure? [y/n]:  y
  Removing [/home/david/.occa/libraries/myLibrary2/*], are you sure? [y/n]:  y
```

```bash
> occa clear --libraries
  Removing [/home/david/.occa/libraries/*], are you sure? [y/n]:  y
```

## Locks

Enabling OCCA to work in distributed machines means we have to handle multiple processes across machines trying to compile the same kernel.
We use directory locks as a way to create a distributed mutex.

When processes die, OCCA catches the signal and removes locks.
However, we can remove the locks if for some reason locks still persist.

```bash
> occa clear --locks
  Removing [/home/david/.occa/locks/*], are you sure? [y/n]:
```

## All The Things!

OCCA caches other helpful files but it might be good to start with a clean environment.

```bash
> occa clear --all
  Removing [/home/david/.occa/*], are you sure? [y/n]:
```

# Versions

There is also a command to print versions of the OCCA API as well as the OKL parser

```bash
> occa version
1.0.0-alpha.6

```

```bash
> occa version --okl
0.2.0
```