const CommunicationSignalProcessor = require('./communication-signal-processor.js');
const communicationSignalProcessor = new CommunicationSignalProcessor();
console.log(`First start of message index: ${communicationSignalProcessor.findStartOfMessageMarker(communicationSignalProcessor.communicationSignal)}`);
