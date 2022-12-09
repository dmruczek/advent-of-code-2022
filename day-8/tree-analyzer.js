'use strict';

module.exports = class TreeAnalyzer {
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

        var treeMap = [];

        for (var i = 0; i < stringArray[0].length; i++) {
            treeMap.push([]);
            for (var j = 0; j < stringArray.length; j++) {
                treeMap[i].push(parseInt(stringArray[i].charAt(j), 10));
            }
        }
        
        this.treeMap = treeMap;
    }

    countVisibleTrees() {
        var visibilityMap = [];
        for (var i = 0; i < this.treeMap[0].length; i++) {
            visibilityMap.push([]);
            for (var j = 0; j < this.treeMap.length; j++) {
                visibilityMap[i].push(false);
            }
        }

        var currentViewableTreeHeight = -1;
        var x,y;
        // Looking from Left to Right.
        for (x = 0; x < this.treeMap[0].length; x++) {
            currentViewableTreeHeight = -1;
            for (y = 0; y < this.treeMap.length; y++) {
                if (this.treeMap[x][y] > currentViewableTreeHeight) {
                    currentViewableTreeHeight = this.treeMap[x][y];
                    visibilityMap[x][y] = true;
                }
            }
        }

        // Looking from Top to Bottom.
        for (y = 0; y < this.treeMap.length; y++) {
            currentViewableTreeHeight = -1;
            for (x = 0; x < this.treeMap[0].length; x++) {
                if (this.treeMap[x][y] > currentViewableTreeHeight) {
                    currentViewableTreeHeight = this.treeMap[x][y];
                    visibilityMap[x][y] = true;
                }
            }
        }

        // Looking from Bottom to Top.
        for (y = 0; y < this.treeMap.length; y++) {
            currentViewableTreeHeight = -1;
            for (x = this.treeMap[0].length-1; x >= 0; x--) {
                if (this.treeMap[x][y] > currentViewableTreeHeight) {
                    currentViewableTreeHeight = this.treeMap[x][y];
                    visibilityMap[x][y] = true;
                }
            }
        }

        // Looking from Right to Left.
        for (x = 0; x < this.treeMap[0].length; x++) {
            currentViewableTreeHeight = -1;
            for (y = this.treeMap.length-1; y >= 0; y--) {
                if (this.treeMap[x][y] > currentViewableTreeHeight) {
                    currentViewableTreeHeight = this.treeMap[x][y];
                    visibilityMap[x][y] = true;
                }
            }
        }

        var totalTreesVisible = 0;
        for (x = 0; x < visibilityMap[0].length; x++) {
            for (y = 0; y < visibilityMap.length; y++) {
                if (visibilityMap[x][y]) {
                    totalTreesVisible ++;
                }
            }
        }

        return totalTreesVisible;
    }

    findBestScenicScore() {

        var bestScenicScore = 0;
        for (var x = 1; x < this.treeMap[0].length; x++) {
            for (var y = 1; y < this.treeMap.length; y++) {
                var score = this.computeScenicScore(x,y);
                if (score > bestScenicScore) {
                    bestScenicScore = score;
                }
            }
        }
        return bestScenicScore;
    }

    computeScenicScore(x,y) {
        const currentTreeHeight = this.treeMap[y][x];
        if (x === 0 || y === 0 || x === this.treeMap.length-1 || y === this.treeMap[0].length-1) {
            return 0;
        }

        var upTrees = 0, downTrees = 0, leftTrees = 0, rightTrees = 0;

        var newX, newY;
        var visibleTreeHeight = -1;
        // Right Trees:
        for (newX = x+1; newX < this.treeMap[0].length; newX++) {
            const thisTree = this.treeMap[y][newX];
            if (thisTree > visibleTreeHeight) {
                rightTrees++;
                if (thisTree >= currentTreeHeight) {
                    break;
                }
            }
        }

        visibleTreeHeight = -1;
        // Left Trees:
        for (newX = x-1; newX >= 0; newX--) {
            const thisTree = this.treeMap[y][newX];
            if (thisTree > visibleTreeHeight) {
                leftTrees++;
                if (thisTree >= currentTreeHeight) {
                    break;
                }
            }
        }

        visibleTreeHeight = -1;
        // Up Trees:
        for (newY = y-1; newY >= 0; newY--) {
            const thisTree = this.treeMap[newY][x];
            if (thisTree > visibleTreeHeight) {
                upTrees++;
                if (thisTree >= currentTreeHeight) {
                    break;
                }
            }
        }

        visibleTreeHeight = -1;
        // Down Trees:
        for (newY = y+1; newY < this.treeMap.length; newY++) {
            const thisTree = this.treeMap[newY][x];
            if (thisTree > visibleTreeHeight) {
                downTrees++;
                if (thisTree >= currentTreeHeight) {
                    break;
                }
            }
        }

        return upTrees * downTrees * leftTrees * rightTrees;
    }

};
