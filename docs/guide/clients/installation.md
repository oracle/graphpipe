# Client Installation

::: tabs install

- python

    ```bash
    git clone https://github.com/oracle/graphpipe-py
    cd graphpipe-py
    python setup.py install
    ```

- golang

    ```bash
    go get github.com/oracle/graphpipe-go
    cd $GOPATH/src/github.com/oracle/graphpipe-go
    make install-govendor
    make deps
    ```

- java

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

    ```
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

:::

