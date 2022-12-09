'use strict';

module.exports = class CargoCrateMover {
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

        var i = 0;
        while (!stringArray[i].match(/^\s*$/)) {
            i++;
        }
        const cargoNumberLineIndex = i-1;
        const bottomCargoLineIndex = i-2;
        const match = stringArray[cargoNumberLineIndex].match(/^.*(\d+)\s*$/);
        const numberOfStacks = match[1];

        var cargoStacks = [];
        for (i = 0; i < numberOfStacks; i++) {
            cargoStacks.push([]);
        }

        for (i = 0; i <= bottomCargoLineIndex; i++) {
            for (var j = 0; j < numberOfStacks; j++) {
                const cargo = stringArray[i].charAt(1 + (j * 4));
                if (cargo !== ' ') {
                    cargoStacks[j].push(cargo);
                }
            }
        }

        for (i = 0; i < cargoStacks.length; i++) {
            cargoStacks[i] = cargoStacks[i].reverse();
        }

        var instructionList = [];
        for (i = cargoNumberLineIndex+2; i < stringArray.length; i++) {
            const match = stringArray[i].match(/^move (\d+) from (\d+) to (\d+)/);
            instructionList.push({
                numberToMove: parseInt(match[1], 10),
                origin: parseInt(match[2], 10),
                destination: parseInt(match[3], 10)
            });
        }

        this.cargoStacks = cargoStacks;
        this.instructionList = instructionList;
    }

    processInstruction(instruction) {
        for (var i = 0; i < instruction.numberToMove; i++) {
            const originStack = this.cargoStacks[instruction.origin-1];
            const destinationStack = this.cargoStacks[instruction.destination-1];
            var cargoItem = originStack.splice(originStack.length-1, 1)[0];
            destinationStack.push(cargoItem);
        }
    }

    getTopCrateForEachStack() {
        var topCrates = '';
        for (var i = 0; i < this.cargoStacks.length; i++) {
            topCrates += this.cargoStacks[i][this.cargoStacks[i].length-1];
        }
        return topCrates;
    }

    processAllInstructions() {
        for (var i = 0; i < this.instructionList.length; i++) {
            this.processInstruction(this.instructionList[i]);
        }
        return this.getTopCrateForEachStack();
    }


};