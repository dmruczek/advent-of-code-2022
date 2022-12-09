'use strict';

module.exports = class CommunicationSignalProcessor {
    constructor(useTestData) {
        this.initialize(useTestData);
    }

    initialize(useTestData) {
        if (useTestData) {
            this.parseData('test-input.txt');
        } else {
            this.parseData('input.txt');
        }
    }

    parseData(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const stringArray = data.split(os.EOL);

        this.communicationSignal = stringArray[0];
    }


    allCharactersDifferent(str) {
        for (var i = 0; i < str.length; i++) {
            for (var j = i+1; j < str.length; j++) {
                if (str.charAt(i) === str.charAt(j)) {
                    return false;
                }
            }
        }
        return true;
    }

    findStartOfPacketMarker(communicationSignal) {
        for (var i = 0; i < communicationSignal.length; i++) {
            if (this.allCharactersDifferent(communicationSignal.substr(i, 4))) {
                return i + 4;
            }
        }
    }

    findStartOfMessageMarker(communicationSignal) {
        for (var i = 0; i < communicationSignal.length; i++) {
            if (this.allCharactersDifferent(communicationSignal.substr(i, 14))) {
                return i + 14;
            }
        }
    }

};