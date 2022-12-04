'use strict';

module.exports = class RockPaperScissorsTournamentSimulator {
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

        const opponentMap = {'A' : 'rock', 'B': 'paper', 'C': 'scissors'};
        const myMap = {'X' : 'rock', 'Y': 'paper', 'Z': 'scissors'};

        this.rawData = stringArray;
        this.instructionArray = [];
        for (var i in stringArray) {
            const line = stringArray[i];
            const instruction = {
                opponent: opponentMap[line.charAt(0)],
                mine: myMap[line.charAt(2)]
            };
            this.instructionArray.push(instruction);
        }
    }

    getScoreForMatchup(instruction) {
        var score = 0;
        if (instruction.mine === 'rock') {
            score += 1;
            if (instruction.mine === instruction.opponent) {
                score += 3;
            } else if (instruction.opponent === 'scissors') {
                score += 6;
            }
        } else if (instruction.mine === 'paper') {
            score += 2;
            if (instruction.mine === instruction.opponent) {
                score += 3;
            } else if (instruction.opponent === 'rock') {
                score += 6;
            }
        } else if (instruction.mine === 'scissors') {
            score += 3;
            if (instruction.mine === instruction.opponent) {
                score += 3;
            } else if (instruction.opponent === 'paper') {
                score += 6;
            }
        } else {
            throw "unexpected instruction";
        }
        return score;
    }

    getTotalScore() {
        var totalScore = 0;
        for (var i in this.instructionArray) {
            const instruction = this.instructionArray[i];
            totalScore += this.getScoreForMatchup(instruction);
        }
        return totalScore;
    }


};