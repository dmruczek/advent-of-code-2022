const CommunicationSignalProcessor = require('./communication-signal-processor.js');
const communicationSignalProcessor = new CommunicationSignalProcessor();
console.log(`First start of packet index: ${communicationSignalProcessor.findStartOfPacketMarker(communicationSignalProcessor.communicationSignal)}`);
