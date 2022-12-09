describe('DirectoryTraverser', function () {

    const DirectoryTraverser = require('./directory-traverser.js');

    describe('loadData', function() {
        it('should properly load all commands and output', function () {
            const directoryTraverser = new DirectoryTraverser(true);
            expect(directoryTraverser.allCommandsWithOutput).toEqual([
                {command: 'cd /', output: []},
                {command: 'ls', output: ['dir a', '14848514 b.txt', '8504156 c.dat', 'dir d']},
                {command: 'cd a', output: []},
                {command: 'ls', output: ['dir e', '29116 f', '2557 g', '62596 h.lst']},
                {command: 'cd e', output: []},
                {command: 'ls', output: ['584 i']},
                {command: 'cd ..', output: []},
                {command: 'cd ..', output: []},
                {command: 'cd d', output: []},
                {command: 'ls', output: ['4060174 j', '8033020 d.log', '5626152 d.ext', '7214296 k']},
            ]);
        });
    });

    describe('buildMapOfFilesystem', function() {
        it('should follow the commands to build a logical map of the filesystem.', function () {
            const directoryTraverser = new DirectoryTraverser(true);
            directoryTraverser.buildMapOfFilesystem();
            expect(directoryTraverser.root.getSize()).toBe(48381165);
            expect(directoryTraverser.root.getChildByName('a').getChildByName('e').getSize()).toBe(584);
            expect(directoryTraverser.root.getChildByName('a').getSize()).toBe(94853);
            expect(directoryTraverser.root.getChildByName('d').getSize()).toBe(24933642);

        });
    });

    describe('getSumOfAllSmallDirectories', function() {
        it('should get the sum of all directories in the filesystem with size < 100,000', function () {
            const directoryTraverser = new DirectoryTraverser(true);
            directoryTraverser.buildMapOfFilesystem();
            expect(directoryTraverser.getSumOfAllSmallDirectories()).toBe(95437);
        });
    });

    describe('getSmallestDirectoryToDeleteAndMakeRoom', function() {
        it('should find the smallest directory that can be deleted to free up enough space.', function () {
            const directoryTraverser = new DirectoryTraverser(true);
            directoryTraverser.buildMapOfFilesystem();
            expect(directoryTraverser.getSmallestDirectoryToDeleteAndMakeRoom()).toEqual({ name: 'd', size: 24933642 });
        });
    });

});