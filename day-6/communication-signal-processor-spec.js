describe('CampCleanupManager', function () {

    const CommunicationSignalProcessor = require('./communication-signal-processor.js');

    describe('loadData', function() {
        it('should properly load the communication signal', function () {
            const communicationSignalProcessor = new CommunicationSignalProcessor(true);
            expect(communicationSignalProcessor.communicationSignal).toBe('mjqjpqmgbljsphdztnvjfqwrcgsmlb');
        });
    });

    describe('findStartOfPacketMarker', function() {
        it('should find the first index where 4 unique characters end', function () {
            const communicationSignalProcessor = new CommunicationSignalProcessor(true);
            expect(communicationSignalProcessor.findStartOfPacketMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7);
            expect(communicationSignalProcessor.findStartOfPacketMarker('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
            expect(communicationSignalProcessor.findStartOfPacketMarker('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
            expect(communicationSignalProcessor.findStartOfPacketMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
            expect(communicationSignalProcessor.findStartOfPacketMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);
        });
    });
    
 
});