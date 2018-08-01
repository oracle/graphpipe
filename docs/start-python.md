# Using graphpipe in your client application

Before you get started, make sure you read THIS to get a good high level
understanding of how GraphPipe works.  The rest of this page will tell
you how these concepts are articulated in python, and the key functionality
that you will likely need to integrate GraphPipe into your app.

## Client installation
The graphpipe python library is designed to make it easy to use numpy arrays
to make requests against a remote server; the details of converting in and out
of flatbuffers are hidden.

To install graphpipe for python from pip:
```
    > pip install graphpipe
```

To install from source repo:
```
    > git clone https://github.com/oracle/graphpipe-py
    > cd graphpipe-py
    > python setup.py install
```

## Starting a server

For a quick test to see if your python library is installed correctly,
let's try to run inference against a simple Squeezenet model.
```
    > wget squeezenet.pb  # TODO put right thing
    > docker run -p 9000:9000  -v $PWD:/data/ phx.ocir.io/bmcskeppareuser/ml/graphpipe-tf-cpu --model=/data/squeezenet.pb --listen="0.0.0.0:9000"
```

Start this model, and then read on

## Making Inference Requests

Now that you have an identity server, you can see what metadata is provided
by the model by requesting model metadata.

[filename](_media/metadata_example_1.py ':include :type=code')
```
from graphpipe import remote 

url = "http://localhost:9000"
metadata = remote.metadata(url)

X = np.random.rand((10, 10, 10))
predictions = remote.execute(args.url, X)
assert(predictions.sum() == 0.)
```

## Dealing with named inputs
