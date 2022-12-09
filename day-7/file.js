'use strict';

module.exports = class File {

    constructor(name, size) {
        this.name = name;
        this.size = size;
    }

    isDirectory() {
        return false;
    }

    getSize() {
        return this.size;
    }

    printWithDepth(depth) {
        var line = '';
        for (var i = 0; i < depth; i++) {
            line += ' ';
        }
        line += `- ${this.name} (file, size=${this.size})`;
        console.log(line);
    }

};