'use strict';

const Directory = require('./directory.js');
const File = require('./file.js');

module.exports = class DirectoryTraverser {
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

        // Always starts with cd /
        var command = 'cd /';
        var output = [];
        var allCommandsWithOutput = [];
        for (var i = 1; i < stringArray.length; i++) {
            if (stringArray[i].includes('$')) {
                allCommandsWithOutput.push({
                    command: command,
                    output: output
                });
                command = stringArray[i].substring(2);
                output = [];
            } else {
                output.push(stringArray[i]);
            }
        }
        allCommandsWithOutput.push({
            command: command,
            output: output
        });

        this.allCommandsWithOutput = allCommandsWithOutput;
    }

    buildMapOfFilesystem() {
        var root = new Directory("/");
        this.root = root;
        var currentDirectory = root;
        for (var i = 1; i < this.allCommandsWithOutput.length; i++) {
            const command = this.allCommandsWithOutput[i].command;
            const output = this.allCommandsWithOutput[i].output;

            if (command.startsWith('ls')) {
                for (var j = 0; j < output.length; j++) {
                    const entry = output[j];
                    if (entry.startsWith('dir')) {
                        const name = entry.match(/dir (.*)/)[1];
                        var newDir = new Directory(name, currentDirectory);
                        currentDirectory.addChild(newDir);
                    } else {
                        const match = entry.match(/(\d+) (.*)/);
                        var newFile = new File(match[2], parseInt(match[1], 10));
                        currentDirectory.addChild(newFile);
                    }
                }
            } else if (command.startsWith('cd ')) {
                const target = command.match(/cd (.*)/)[1];
                if (target === '..') {
                    currentDirectory = currentDirectory.parent;
                } else {
                    currentDirectory = currentDirectory.getChildByName(target);
                }
            }
        }
    }

    getSumOfAllSmallDirectories() {
        var smallDirs = this.root.getSmallDirectories();
        var total = 0;
        for (var i = 0; i < smallDirs.length; i++) {
            total += smallDirs[i].size;
        }
        return total;
    }

};
