# Specification

## 1. Introduction
The graphpipe specification describes a transport protocol used to exchange information between a client and a model inference server.  A graphpipe-compatible client can use this protocol to send model inference requests to a graphpipe-compatible server, which can then send inference responses back to the client.

The protocol employs a low-overhead data format based on flatbuffers[1], which implements highly efficient serialization/deserialization operations.  

## 2. Terminology

### 2.1 Tensor
A tensor is a multi-dimensional array.

### 2.2 Model
A model refers to any machine learning entity or function that can perform inference on the input data and generate output data.

### 2.3 Input
Input refers to the tensor data transmitted in a request to the server upon which model inference is performed.  

### 2.4 Output
Output refers to the resulting tensor data from model inference that is transmitted in the response from the server. 

### 2.5 Server
To implement the graphpipe spec, a server MUST accept an encoded flatbuffer Request message and return either an InferResponse or a MetadataResponse.

## 3. Messages

### 3.1 Request
The graphpipe spec requires the server to respond to a request message. This request message is a union representing two different request types.
The request is either an InferRequest or a MetadataRequest. 

#### 3.1.1 InferRequest
The InferRequest accepts one or more tensors as well as a list of strings representing the input names and a list of strings representing the output names. 

#### 3.1.2 MetadataRequest
The MetadataRequest allows a client to request information about the server and the model.

Input and output names are unicode identifiers representing inputs and outputs to the model. It is not required for the server to support multiple inputs and outputs. For example, it is perfectly acceptable to have a simple server that accepts and returns a single tensor and requires no input or output names.
On the other hand, you could have a complex convolutional model that accepts multiple inputs and allows the client to request output at one or more of the convolutional layers.

### 3.2 InferResponse
The InferResponse contains one output tensor per requested output name, or an error. If no output names are requested, the server may return one or more default output tensors. If no input names are included, the server may apply the input tensors to default inputs.

### 3.3 MetadataResponse
The MetadataResponse contains information describing the types and shapes of the supported inputs and outputs.

## 4. Flatbuffer specification

The following describes the graphpipe protocol messages in .fbs format [1]:

```
namespace graphpipe;

/*
  Enumeration of supported types.
*/
enum Type:uint8 {
    Null,
    Uint8,
    Int8,
    Uint16,
    Int16,
    Uint32,
    Int32,
    Uint64,
    Int64,
    Float16,
    Float32,
    Float64,
    String,
}

/*
  Tensor definition.

  type: defines what type of data this Tensor holds
  shape: an array that describes the shape of the Tensor (like [10, 3, 224, 224])
  data: stores the actual tensor data for all types but String
  string_val: holds the data for tensors of type String
*/
table Tensor {
    type:Type;
    shape:[int64];
    data:[uint8];
    string_val:[string];
}

/*
  Req definition, which containes either an InferRequest or a MetadataRequest
*/
union Req {InferRequest, MetadataRequest}

table Request {
    req:Req;
}

/*
  Infer Request definition, which is used to request data from a remote model.
  config: application-specific string used for request-specific model configuration.
  input_names: A list of input names
  input_tensors: A list of input tensors, associated with input_names
  output_names: A list of outputs to return in response to the provided inputs
*/
table InferRequest {
    config:string;
    input_names:[string];
    input_tensors:[Tensor];
    output_names:[string];
}

/*
  Error definition
  code: integer representation of the error
  message: Human-readable message description
*/
table Error {
    code:int64;
    message:string;
}

/*
  InferResponse definition.
  output_tensors: a list of output_tensors, in the order requested by InferRequest.output_names
  errors: A list of errors that occurred during processing, if any
*/
table InferResponse {
    output_tensors:[Tensor];
    errors:[Error];
}

/*
  MetadatRequest.  Used to request metadata about a graphpipe model server.
*/
table MetadataRequest {}

/*
  IOMetadata definition.  Provides info about inputs and outputs of a model.
  name: name of the input/output
  description: description of the input/output
  shape: input or output shape
  type: Type of the input/output
*/
table IOMetadata {
    name:string; // required
    description:string; // optional
    shape:[int64]; // required
    type:Type; // required
}

/*
  MetadataResponse definition.  Describes characteristics of a graphpipe model server.
  name: name of the model being served
  version: the version of the server
  server: Name of the server
  description: description of the model being served
  inputs: metadata about the model's inputs
  outputs: metadata about the model's outputs
*/
table MetadataResponse {
    name:string;
    version:string;
    server:string;
    description:string;
    inputs:[IOMetadata]; // required
    outputs:[IOMetadata]; // required
}

root_type Request;
```

## 5. References
1. https://github.com/google/flatbuffers

