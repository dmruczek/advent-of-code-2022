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

            this.rucksackArray.push(line);
        }
    }

    findCommonItem(rucksack) {
        var compartmentOne = rucksack.substring(0,rucksack.length/2),
        compartmentTwo = rucksack.substring(rucksack.length/2);
        for (var i = 0; i < compartmentOne.length; i++) {
            const item = compartmentOne[i];
            if (compartmentTwo.includes(item)) {
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

    findGroupBadge(groupRucksacks) {
        for (var i = 0; i < groupRucksacks[0].length; i++) {
            var item = groupRucksacks[0].charAt(i);
            if (groupRucksacks[1].includes(item) && groupRucksacks[2].includes(item)) {
                return item;
            }
        }
    }

    calculatePriorityOfAllGroupBadges() {
        var totalPriority = 0;
        for (var i = 0; i < this.rucksackArray.length; i+= 3) {
            var badge = this.findGroupBadge(this.rucksackArray.slice(i, i+3));
            totalPriority += this.getItemPriority(badge);
        }
        return totalPriority;
    }

};