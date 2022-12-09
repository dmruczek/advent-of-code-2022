'use strict';

module.exports = class Directory {

    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.children = [];
    }

    isDirectory() {
        return true;
    }

    addChild(obj) {

        // first check to make sure we don't already have this as a child
        for (var i = 0; i < this.children.length; i++) {
            if (obj.name === this.children[i].name) {
                return;
            }
        }

        this.children.push(obj);
    }

    getChildByName(name) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].name === name) {
                return this.children[i];
            }
        }
    }

    getSize() {
        var size = 0;
        for (var i = 0; i < this.children.length; i++) {
            size += this.children[i].getSize();
        }
        return size;
    }


    printWithDepth(depth) {
        var line = '';
        for (var i = 0; i < depth; i++) {
            line += ' ';
        }
        line += `- ${this.name} (dir)`;
        console.log(line);
        for (i = 0; i < this.children.length; i++) {
            this.children[i].printWithDepth(depth+1);
        }
    }

    print() {
        this.printWithDepth(0);
    }

    getLargeDirectories() {
        var largeDirs = [];
        for (var i = 0; i < this.children.length; i++) {
            const child =this.children[i];
            if (child.isDirectory()) {
                const size = this.children[i].getSize();
                if (size >= 100000) {
                    largeDirs.push({name: child.name, size: size});
                }
                Array.prototype.push.apply(largeDirs, child.getLargeDirectories());
            }
        }
        return largeDirs;
    }

    getSmallDirectories() {
        var smallDirs = [];
        for (var i = 0; i < this.children.length; i++) {
            const child =this.children[i];
            if (child.isDirectory()) {
                const size = this.children[i].getSize();
                if (size <= 100000) {
                    smallDirs.push({name: child.name, size: size});
                }
                Array.prototype.push.apply(smallDirs, child.getSmallDirectories());
            }
        }
        return smallDirs;
    }

    getAllDirectoriesWithSize() {
        var dirs = [];
        dirs.push({name: this.name, size: this.getSize()});
        for (var i = 0; i < this.children.length; i++) {
            const child =this.children[i];
            if (child.isDirectory()) {
                Array.prototype.push.apply(dirs, child.getAllDirectoriesWithSize());
            }
        }
        return dirs;
    }


}; 