Why This Exists
---------------

Who needs another data protocol for ML tasks, anyway?
Short answer: you, probably, and the ML ecosystem at large.

At current there are a few large ecosystems for ML work, mostly
with large companies behind them, each with its own data protocol
and framework.

Standards, everybody's got one, right?

While that's true, when working with multiple of these ecosystems
in concert, converting back and forth between these competing
formats was a significant performance hit. And so graphpipe was
born.

At its heart, graphpipe's goal is to be a very lightweight and
performant wire protocol for communicating between multiple,
possibly heterogeneous, model servers. And, while doing that,
provide a framework-agnostic ecosystem of tools and libraries to
simplify the lives of anybody working with distributed, remote,
or heterogeneous models.

Graphpipe is fast as heck and ready to party.

