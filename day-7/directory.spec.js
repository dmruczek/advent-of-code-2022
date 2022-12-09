describe('Directory', function () {

    const DirectoryTraverser = require('./directory-traverser.js');

    describe('getSmallDirectories', function() {
        it('should return a list of all directories 100k or smaller.', function () {
            const directoryTraverser = new DirectoryTraverser(true);
            directoryTraverser.buildMapOfFilesystem();
            expect(directoryTraverser.root.getSmallDirectories()).toEqual([ { name: 'a', size: 94853 }, { name: 'e', size: 584 } ]);
        });
    });

});