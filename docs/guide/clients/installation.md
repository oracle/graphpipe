# Client Installation

Before making inference requests against a GraphPipe server, you need to
install the appropriate GraphPipe client libraries for your language of choice.

Don't see your favorite language?  Please open an
[issue](https://github.com/oracle/graphpipe/issues/) so that we can gauge which
languages to support next!


::: tabs install

- python

    ```bash
    git clone https://github.com/oracle/graphpipe-py
    cd graphpipe-py
    python setup.py install
    ```

- go

    ```bash
    go get github.com/oracle/graphpipe-go
    cd $GOPATH/src/github.com/oracle/graphpipe-go
    make install-govendor
    make deps
    ```

- java

    <!---
    ```bash
    mvn install:install-file \
    -Dfile=<path-to-jar> \
    -DgroupId=com.oracle.graphpipe \
    -DartifactId=graphpipe-java \
    -Dversion=1.0-SNAPSHOT \
    -Dpackaging=jar \
    -DgeneratePom=true
    ```

    Or if using maven-install-plugin >=2.5, you can simply do:

    ```bash
    mvn install:install-file -Dfile=<path-to-jar>
    ```

    You must also add the following deps to your pom.xml:

    ```xml
        <dependency>
            <groupId>com.oracle.graphpipe</groupId>
            <artifactId>graphpipe</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <dependency>
            <groupId>com.google.flatbuffers</groupId>
            <artifactId>flatbuffers-java</artifactId>
            <version>1.9.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.httpcomponents</groupId>
            <artifactId>httpclient</artifactId>
            <version>4.3.6</version>
        </dependency>
        <dependency>
            <groupId>org.nd4j</groupId>
            <artifactId>nd4j-native-platform</artifactId>
            <version>1.0.0-alpha</version>
        </dependency>
    ```
    -->
    Coming Soon!

:::

Once you've installed your client, continue to the 
[next section](guide/clients/usage.md) to see an example of how 
to make a basic request.
