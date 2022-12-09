'use strict';

module.exports = class CampCleanupManager {
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

        this.rawData = stringArray;

        this.cleanupPairs = [];

        const re = /^(\d+)\-(\d+),(\d+)\-(\d+)$/;

        for (var i in stringArray) {
            const line = stringArray[i];
            const match = line.match(re);
            this.cleanupPairs.push(
                [
                    {start:parseInt(match[1],10), end: parseInt(match[2],10)},
                    {start:parseInt(match[3],10), end: parseInt(match[4],10)}
                ]
            );
        }
    }

    checkCleanupPairForTotalOverlap(cleanupPair) {
        return (cleanupPair[0].start >= cleanupPair[1].start && cleanupPair[0].end <= cleanupPair[1].end) || 
        (cleanupPair[1].start >= cleanupPair[0].start && cleanupPair[1].end <= cleanupPair[0].end);
    }

    checkCleanupPairForAnyOverlap(cleanupPair) {
        return (cleanupPair[0].start >= cleanupPair[1].start && cleanupPair[0].start <= cleanupPair[1].end) ||
        (cleanupPair[0].end >= cleanupPair[1].start && cleanupPair[0].end <= cleanupPair[1].end) ||
        (cleanupPair[1].start >= cleanupPair[0].start && cleanupPair[1].start <= cleanupPair[0].end) ||
        (cleanupPair[1].end >= cleanupPair[0].start && cleanupPair[1].end <= cleanupPair[0].end);
    }

    calculcateNumberOfPairsWithTotalOverlap() {
        var total = 0;
        for (var i in this.cleanupPairs) {
            const cleanupPair = this.cleanupPairs[i];
            if (this.checkCleanupPairForTotalOverlap(cleanupPair)) {
                total ++;
            }
        }
        return total;
    }

    calculcateNumberOfPairsWithAnyOverlap() {
        var total = 0;
        for (var i in this.cleanupPairs) {
            const cleanupPair = this.cleanupPairs[i];
            if (this.checkCleanupPairForAnyOverlap(cleanupPair)) {
                total ++;
            }
        }
        return total;
    }

};