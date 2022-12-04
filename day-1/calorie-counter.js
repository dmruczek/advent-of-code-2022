'use strict';

module.exports = class CalorieCounter {
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
        this.calorieArray = [];

        var currentCalories = 0;
        for (var i in stringArray) {
            const line = stringArray[i];
            if (line.length === 0) {
                this.calorieArray.push(currentCalories);
                currentCalories = 0;
            } else {
                currentCalories += parseInt(line, 10);
            }
        }
        this.calorieArray.push(currentCalories);
    }

    getHighestCalorieCount() {
        return this.calorieArray.sort(function compareFn(a, b) {return b - a;})[0];
    }

};