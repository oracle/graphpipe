# Usage

Here, we will briefly explore how to access a GraphPipe server
from various clients.  To keep things simple, we will begin by launching
[`graphpipe-echo`](https://github.com/oracle/graphpipe-go/tree/master/cmd/graphpipe-echo),
a server that simply echoes back any GraphPipe Tensor that is sent to it.

To start the server, use the following docker command.

```bash
docker run -it --rm \
      -p 9000:9000 \
      sleepsonthefloor/graphpipe-echo \
      --listen=0.0.0.0:9000
```

The server will now be accessible over port 9000 on your local machine.  Now,
you can make a request against the model using the following languages:

::: tabs remoteinf

- python

    ```python
    from graphpipe import remote
    import numpy as np
    request = np.array([[0.0, 1.0], [2.0, 3.0]])
    result = remote.execute("http://127.0.0.1:9000", request)
    print(result)

    ```

- go

    ```go
    package main

    import (
      "fmt"
      "net/http"

      graphpipe "github.com/oracle/graphpipe-go"
    )

    func main() {
      uri := "http://127.0.0.1:9000"
      request := [][]float32{{0.0, 1.0}, {2.0, 3.0}}
      result, err := graphpipe.Remote(http.DefaultClient, uri, request, "", "")
      if err != nil {
        panic(err)
      }
      fmt.Println(result)
    }
    ```

- java
    <!---
    ```java
    package com.oracle.graphpipe;
    import java.io.IOException;

    public class Main {
        public static void main(String[] args) throws IOException {
            NativeTensor request = NativeTensor.fromArray(
                    new float[][]{{0.0, 1.0}, {2.0, 3.0}});
            NativeTensor result = Remote.Execute("http://127.0.0.1:9000", request);
            System.out.println(result.toINDArray());
        }
    }
    ```
    -->
    Coming Soon!

:::

