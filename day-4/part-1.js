const CampCleanupManager = require('./camp-cleanup-manager.js');
const campCleanupManager = new CampCleanupManager();
console.log(`Total overlaps: ${campCleanupManager.calculcateNumberOfPairsWithTotalOverlap()}`);
