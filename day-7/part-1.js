const DirectoryTraverser = require('./directory-traverser.js');
const directoryTraverser = new DirectoryTraverser();
directoryTraverser.buildMapOfFilesystem();
console.log(`Sum of all small directories is ${directoryTraverser.getSumOfAllSmallDirectories()}`);
