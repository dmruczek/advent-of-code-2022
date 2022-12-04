'use strict';

module.exports = class RucksackItemRearranger {
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

        this.rucksackArray = [];

        for (var i in stringArray) {
            const line = stringArray[i];

            this.rucksackArray.push([
                line.substring(0,line.length/2),
                line.substring(line.length/2)
            ]);
        }
    }

    findCommonItem(rucksack) {
        for (var i = 0; i < rucksack[0].length; i++) {
            const item = rucksack[0][i];
            if (rucksack[1].includes(item)) {
                return item;
            }
        }
        throw 'common item not found';
    }

    getItemPriority(item) {
        const charCode = item.charCodeAt(0);
        if (charCode > 96) {
            return charCode - 96;
        }
        return charCode - 38;
    }

    calculateSumOfMisplacedItemPriorities() {
        var score = 0;
        for (var i in this.rucksackArray) {
            const rucksack = this.rucksackArray[i];
            score += this.getItemPriority(this.findCommonItem(rucksack));
        }
        return score;
    }

};