from graphpipe import remote

url = "http://localhost:9000"
metadata = remote.metadata(url)
print(metadata.Outputs)
