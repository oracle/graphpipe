# Specification

## 1. Introduction

The GraphPipe specification describes a transport protocol
used to exchange information between a client and a model inference server.  A
GraphPipe-compatible client can use this protocol to send model inference
requests to a GraphPipe-compatible server, which can then send inference
responses back to the client.

The protocol employs a low-overhead data format based on [flatbuffers], which
implements highly efficient serialization/deserialization operations.

[flatbuffers]: https://github.com/google/flatbuffers

## 2. Terminology

__Model__ Any machine learning entity or function that accepts input data and
returns output data.

__Server__ Software that provides access to a model by implementing the
GraphPipe spec as detailed in [Section 4](spec?id=_4-server)

__Tensor__ A multi-dimensional array of data with a specific shape and type.

__Input__ Tensor data transmitted in a request to the server.

__Output__ Tensor data transmitted in the response from the server.


## 3. Messages

A flatbeffer specification includes a nested set of _tables_ or messages. These
are analogous to classes or types in a programming language. The flatbuffer
definitions include a number of messages to create a simple API around model
inference. The messages are outlined below. Note that the `string` type in
flatbuffers can hold any variable length binary data, including null, so it
can be thought of as an arbitrarily-sized byte-array.

### 3.1 Tensor

The `Tensor` message holds a tensor. The tensor has a type, which is an
enumeration that is defined in the next section. It has a list of integers
representing the shape of the tensor and two fields for storing data, depending
on the type of the tensor. One of `data` and `string_val` MUST be empty.

```
table Tensor {
    type:Type;
    shape:[int64];
    data:[uint8];
    string_val:[string];
}
```

| Field      | Explanation |
|------------|-------------|
| type       | The type of each element of the tensor. |
| shape      | Array of int64 values representing the size of each dimension of the tensor |
| data       | The raw data of the tensor in little-endian row-major order |
| string_val | An array of raw byte tensors (only used for the `String` type |

#### 3.1.1 Tensor Type

 GraphPipe currently supports the following tensor types:

| Type    | Id | Bytes | Description |
|---------|----|-------|-------------|
| Null    |  0 |  ???  | Type is unknown or not supported |
| Uint8   |  1 |    1  | Unsigned 8-bit integer |
| Int8    |  2 |    1  | Signed 8-bit integer |
| Uint16  |  3 |    2  | Unsigned 16-bit integer |
| Int16   |  4 |    2  | Signed 16-bit integer |
| Uint32  |  5 |    4  | Unsigned 32-bit integer |
| Int32   |  6 |    4  | Signed 32-bit integer |
| Uint64  |  7 |    8  | Unsigned 64-bit integer |
| Int64   |  8 |    8  | Signed 64-bit integer |
| Float16 |  9 |    2  | Half-precision (16-bit) floating point number |
| Float32 | 10 |    4  | Full-precision (32-bit) floating point number |
| Float64 | 11 |    8  | Double-precision (64-bit) floating point number |
| String  | 12 |  var  | Raw bytes. Note that this can hold irregular data |

### 3.2 Request

The GraphPipe spec requires the server to respond to a `Request`
message. This request message contains a union representing two different
request types. The request is either an `InferRequest` or a `MetadataRequest`.


```
union Req {InferRequest, MetadataRequest}

table Request {
    req:Req;
}
```

#### 3.2.1 InferRequest

The `InferRequest` accepts one or more tensors as well as a list of unicode
strings representing the input names and a list of unicode strings representing
the output names. The model server MAY include default input and output names
that are used if none are specified. If input names are specified, the length
of input_names and input_tensors MUST be the same.

The model server MAY support arbitrary config data to change its behavior. This
config data is sent to the server using the config field. This could be used to
turn on debugging, for example. The format of the config field is be defined by
the model server.  It could be a json-encoded string or any other binary data.

```
table InferRequest {
    config:string; // optional
    input_names:[string]; // optional
    input_tensors:[Tensor];
    output_names:[string]; // optional
}
```

| Field          | Explanation |
|----------------|-------------|
| config         | Config data for the model server |
| input_names    | List of unicode strings representing inputs |
| input_tensors  | List of input tensors |
| output_names   | List of unicode strings representing outputs |

#### 3.2.2 MetadataRequest

The `MetadataRequest` allows a client to request information about the server and
the model. A `MetadataRequest` has no fields.

```
table MetadataRequest {}
```

### 3.3 Responses

The server MUST respond to a `InferRequest` with an `InferResponse` and a
`MetadataRequest` with a `MetadataResponse`. In the case of a badly formatted
Request with an invalid type, the server SHOULD respond with an `InferResponse`
containing an `Error`. Note that there is no union response type because the
response type can be determined from the request type.

#### 3.3.1 InferResponse

The `InferResponse` contains one output tensor per requested output name, or an
error. If no output names are requested, the server may return one or more
default output tensors. If no input names are included, the server may apply
the input tensors to default inputs. The server MUST include data in only one
of`output_tensors` and `errors`.

```
table InferResponse {
    output_tensors:[Tensor];
    errors:[Error];
}
```

| Field          | Explanation |
|----------------|-------------|
| output_tensors | The type of each element of the tensor. |
| errors         | Array of `Error` messages (defined below) |

##### 3.3.1.1 Error

The `Error` type contains a representation of the error. The
server SHOULD include a numeric code for each error so they can be
differentiated without parsing the error string

```
table Error {
    code:int64;
    message:string;
}
```
| Field      | Explanation |
|------------|-------------|
| code       | A unique error code for this particular problem |
| message    | A human-friendly unicode error message describing the problem |

#### 3.3.2 MetadataResponse

The `MetadataResponse` contains information describing the types and shapes of
the supported inputs and outputs. It allows a client to validate input and
output data without sending a request through the model.

Input and output names are unicode identifiers representing inputs and outputs
to the model. It is not required for the server to support multiple inputs and
outputs. For example, it is perfectly acceptable to have a simple server that
accepts and returns a single tensor and requires no input or output names.  On
the other hand, you could have a complex convolutional model that accepts
multiple inputs and allows the client to request output at one or more of the
convolutional layers.

```
table MetadataResponse {
    name:string; // optional
    version:string; // optional
    server:string; // optional
    description:string; //optional
    inputs:[IOMetadata]; // required
    outputs:[IOMetadata]; // required
}
```

| Field       | Explanation |
|-------------|-------------|
| name        | Name of the model being served |
| version     | Version of the model server |
| server      | Name of the model server |
| description | Description of the model being served |
| inputs      | Array of `IOMetadata` (defined below) about the inputs |
| outputs     | Array of `IOMetadata` (defined below) about the outputs |

##### 3.3.2.1 IOMetadata

`IOMetadata` contains information about a given input or output. The name is
the unique unicode identifier for this particular input or output. This name is
used when specifying `input_names` and `output_names` as part of an
`InferRequest`. A negative one (-1) in the shape means the model accepts an
arbitrary size input in that dimension. This is generally useful if the model
supports a batch dimension.

```
table IOMetadata {
    name:string; // required
    description:string; // optional
    shape:[int64]; // required
    type:Type; // required
}
```

| Field       | Explanation |
|-------------|-------------|
| name        | Name of the input or output |
| description | Description of the input or output |
| shape       | Shape of the input or output (-1 represents any size) |
| type        | Type of the input or output |


## 4. Server

A GraphPipe server MUST accept flatbuffer-encoded `Request`s over a binary
protocol and return an `InferResponse` or a `MetadataResponse`.  This can be a
standard tcp or unix socket, or it can be served over a higher level protocol
like HTTP/HTTPS. If the server is serving over HTTP, it MUST accept the request
as a POST where the body of the http request contains only the
flatbuffer-encoded requests. It SHOULD also provide helpful information when
the serving endpoint is queried with a GET. One method would be to serialize
the `MetadataResponse` into json and return it in response to a GET.
