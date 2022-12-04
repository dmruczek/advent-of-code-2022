describe('RucksackItemRearranger', function () {

    const RucksackItemRearranger = require('./rucksack-item-rearranger.js');

    describe('loadData', function() {

        it('should properly load the instruction array', function () {
            const rucksackItemRearranger = new RucksackItemRearranger(true);
            const expectedRucksackArray = [
                ['vJrwpWtwJgWr','hcsFMMfFFhFp'],
                ['jqHRNqRjqzjGDLGL','rsFMfFZSrLrFZsSL'],
                ['PmmdzqPrV','vPwwTWBwg'],
                [ 'wMqvLMZHhHMvwLH', 'jbvcjnnSBnvTQFn' ],
                [ 'ttgJtRGJ', 'QctTZtZT' ],
                [ 'CrZsJsPPZsGz', 'wwsLwLmpwMDw' ]
            ];
            expect(rucksackItemRearranger.rucksackArray).toEqual(expectedRucksackArray);
        });

    });

    describe('findCommonItem', function() {

        it('should find the common item in both compartments of the rucksack.', function () {
            const rucksackItemRearranger = new RucksackItemRearranger(true);
            expect(rucksackItemRearranger.findCommonItem(['vJrwpWtwJgWr','hcsFMMfFFhFp'])).toEqual('p');
            expect(rucksackItemRearranger.findCommonItem([ 'wMqvLMZHhHMvwLH', 'jbvcjnnSBnvTQFn' ])).toEqual('v');
        });

    });

    describe('getItemPriority', function() {

        it('should return the priority value of the given item', function () {
            const rucksackItemRearranger = new RucksackItemRearranger(true);
            expect(rucksackItemRearranger.getItemPriority('a')).toEqual(1);
            expect(rucksackItemRearranger.getItemPriority('z')).toEqual(26);
            expect(rucksackItemRearranger.getItemPriority('A')).toEqual(27);
            expect(rucksackItemRearranger.getItemPriority('Z')).toEqual(52);
            expect(rucksackItemRearranger.getItemPriority('p')).toEqual(16);
        });

    });

    describe('calculateSumOfMisplacedItemPriorities', function() {

        it('should return sum of all misplaced item priorities', function () {
            const rucksackItemRearranger = new RucksackItemRearranger(true);
            expect(rucksackItemRearranger.calculateSumOfMisplacedItemPriorities()).toEqual(157);
        });

    });

});