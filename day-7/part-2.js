const DirectoryTraverser = require('./directory-traverser.js');
const directoryTraverser = new DirectoryTraverser();
directoryTraverser.buildMapOfFilesystem();
const dirToDelete = directoryTraverser.getSmallestDirectoryToDeleteAndMakeRoom();
console.log(`Smallest directory to delete and make room is ${dirToDelete.name} with size ${dirToDelete.size}`);
