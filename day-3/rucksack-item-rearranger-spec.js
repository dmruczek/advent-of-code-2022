describe('RucksackItemRearranger', function () {

    const RucksackItemRearranger = require('./rucksack-item-rearranger.js');

    describe('loadData', function() {

        it('should properly load the instruction array', function () {
            const rucksackItemRearranger = new RucksackItemRearranger(true);
            const expectedRucksackArray = [
                'vJrwpWtwJgWrhcsFMMfFFhFp',
                'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
                'PmmdzqPrVvPwwTWBwg',
                 'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn' ,
                 'ttgJtRGJQctTZtZT' ,
                 'CrZsJsPPZsGzwwsLwLmpwMDw'
            ];
            expect(rucksackItemRearranger.rucksackArray).toEqual(expectedRucksackArray);
        });

    });

    describe('findCommonItem', function() {

        it('should find the common item in both compartments of the rucksack.', function () {
            const rucksackItemRearranger = new RucksackItemRearranger(true);
            expect(rucksackItemRearranger.findCommonItem('vJrwpWtwJgWrhcsFMMfFFhFp')).toEqual('p');
            expect(rucksackItemRearranger.findCommonItem( 'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn')).toEqual('v');
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

    describe('findGroupBadge', function() {

        it('should return the badge that is in common for each rucksack in the list of rucksacks passed in', function () {
            const rucksackItemRearranger = new RucksackItemRearranger(true);
            expect(rucksackItemRearranger.findGroupBadge(['vJrwpWtwJgWrhcsFMMfFFhFp','jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL','PmmdzqPrVvPwwTWBwg'])).toBe('r');
            expect(rucksackItemRearranger.findGroupBadge(['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn','ttgJtRGJQctTZtZT','CrZsJsPPZsGzwwsLwLmpwMDw'])).toBe('Z');
        });

    });

    describe('calculatePriorityOfAllGroupBadges', function() {

        it('should find all group badges and then calculate the total priority', function () {
            const rucksackItemRearranger = new RucksackItemRearranger(true);
            expect(rucksackItemRearranger.calculatePriorityOfAllGroupBadges()).toBe(70);
        });

    });
    


});