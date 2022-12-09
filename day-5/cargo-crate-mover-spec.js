describe('CargoCrateMover', function () {

    const CargoCrateMover = require('./cargo-crate-mover.js');

    describe('loadData', function() {

        it('should properly load current state of the cargo and cargo movement instructions', function () {
            const cargoCrateMover = new CargoCrateMover(true);

            expect(cargoCrateMover.cargoStacks).toEqual([['Z', 'N'], ['M', 'C', 'D'], ['P']]);

            expect(cargoCrateMover.instructionList).toEqual([
                {numberToMove: 1, origin: 2, destination: 1},
                {numberToMove: 3, origin: 1, destination: 3},
                {numberToMove: 2, origin: 2, destination: 1},
                {numberToMove: 1, origin: 1, destination: 2},
            ]);

        });

    });

    
    describe('processInstruction', function() {

        it('should follow the instructions to move the crates as specified.', function () {
            const cargoCrateMover = new CargoCrateMover(true);

            cargoCrateMover.cargoStacks = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
            cargoCrateMover.processInstruction({numberToMove: 1, origin: 2, destination: 1});
            expect(cargoCrateMover.cargoStacks).toEqual([['Z', 'N', 'D'], ['M', 'C'], ['P']]);
            cargoCrateMover.processInstruction({numberToMove: 3, origin: 1, destination: 3});
            expect(cargoCrateMover.cargoStacks).toEqual([[], ['M', 'C'], ['P','D','N','Z']]);
        });

    });

    describe('processAllInstructions', function() {

        it('should follow all instructions and then return the top crates in each stack.', function () {
            const cargoCrateMover = new CargoCrateMover(true);
            expect(cargoCrateMover.processAllInstructions()).toBe('CMZ');
        });

    });
    
});