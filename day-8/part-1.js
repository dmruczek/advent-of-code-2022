const TreeAnalyzer = require('./tree-analyzer.js');
const treeAnalyzer = new TreeAnalyzer();
console.log(`Total number of visible trees is ${treeAnalyzer.countVisibleTrees()}`);
