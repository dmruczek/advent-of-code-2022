describe('CampCleanupManager', function () {

    const CampCleanupManager = require('./camp-cleanup-manager.js');

    describe('loadData', function() {

        it('should properly load the cleanup pairs', function () {
            const campCleanupManager = new CampCleanupManager(true);
            expect(campCleanupManager.cleanupPairs[0]).toEqual([{start:2, end:4}, {start:6, end:8}]);
            expect(campCleanupManager.cleanupPairs[1]).toEqual([{start:2, end:3}, {start:4, end:5}]);
        });

    });

    describe('checkCleanupPairForTotalOverlap', function() {

        it('should return true if one of the cleanup pair fully contains the other', function () {
            const campCleanupManager = new CampCleanupManager(true);
            expect(campCleanupManager.checkCleanupPairForTotalOverlap([{start:2, end:4}, {start:6, end:8}])).toBe(false);
            expect(campCleanupManager.checkCleanupPairForTotalOverlap([{start:2, end:3}, {start:4, end:5}])).toBe(false);
            expect(campCleanupManager.checkCleanupPairForTotalOverlap([{start:6, end:6}, {start:4, end:6}])).toBe(true);
            expect(campCleanupManager.checkCleanupPairForTotalOverlap([{start:4, end:6}, {start:6, end:6}])).toBe(true);
            expect(campCleanupManager.checkCleanupPairForTotalOverlap([{start:1, end:9}, {start:4, end:8}])).toBe(true);
            expect(campCleanupManager.checkCleanupPairForTotalOverlap([{start:4, end:8}, {start:1, end:9}])).toBe(true);
        });

    });

    describe('calculcateNumberOfPairsWithTotalOverlap', function() {

        it('should calculate the total number of pairs that have total overlap', function () {
            const campCleanupManager = new CampCleanupManager(true);
            expect(campCleanupManager.calculcateNumberOfPairsWithTotalOverlap()).toBe(2);
        });

    });

    
});