Launch a GraphPipe server that returns any data sent to it:

```bash
  docker run -it --rm \
        -p 9000:9000 \
        graphpipe-identity \
        --listen=0.0.0.0:9000
```

Make a request against the model:

::: tabs remoteinf

- python

    ```python
    from graphpipe import remote
    import numpy as np
    data = np.array([[0.0, 1.0], [2.0, 3.0]])
    out = remote.execute("http://127.0.0.1:9000", data)
    print(out)

    ```

- golang

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

    ```java
    ... coming soon!
    ```

:::

