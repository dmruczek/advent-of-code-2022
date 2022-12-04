describe('CalorieCounter', function () {

    const CalorieCounter = require('./calorie-counter.js');

    describe('loadData', function() {

        it('should properly load the calorie array', function () {
            const calorieCounter = new CalorieCounter(true);
            const expectedCalorieArray = [6000,4000,11000,24000,10000];
            expect(calorieCounter.calorieArray).toEqual(expectedCalorieArray);
        });

    });

    describe('getHighestCalorieCount', function() {

        it('should return the highest calorie count', function () {
            const calorieCounter = new CalorieCounter(true);
            expect(calorieCounter.getHighestCalorieCount()).toEqual(24000);
        });

    });

});