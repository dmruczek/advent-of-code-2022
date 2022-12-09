describe('Directory', function () {

    const TreeAnalyzer = require('./tree-analyzer.js');

    describe('loadData', function() {
        it('should create a map of all trees.', function () {
            const treeAnalyzer = new TreeAnalyzer(true);
            expect(treeAnalyzer.treeMap).toEqual(
                [
                    [ 3, 0, 3, 7, 3 ],
                    [ 2, 5, 5, 1, 2 ],
                    [ 6, 5, 3, 3, 2 ],
                    [ 3, 3, 5, 4, 9 ],
                    [ 3, 5, 3, 9, 0 ]
                  ]                
            );
        });
    });

    describe('countVisibleTrees', function() {
        it('should count the numjber of trees that are visible.', function () {
            const treeAnalyzer = new TreeAnalyzer(true);
            expect(treeAnalyzer.countVisibleTrees()).toBe(21);
        });
    });


    describe('computeScenicScore', function() {
        it('should compute the Scenic Score for the given location.', function () {
            const treeAnalyzer = new TreeAnalyzer(true);
            expect(treeAnalyzer.computeScenicScore(2,1)).toBe(4);
            expect(treeAnalyzer.computeScenicScore(2,3)).toBe(8);
        });
    });

    describe('findBestScenicScore', function() {
        it('should find the best scenic score of all available positions', function () {
            const treeAnalyzer = new TreeAnalyzer(true);
            expect(treeAnalyzer.findBestScenicScore()).toBe(8);
        });
    });
    

});