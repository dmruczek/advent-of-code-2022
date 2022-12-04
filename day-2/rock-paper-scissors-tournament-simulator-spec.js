describe('RockPaperScissorsTournamentSimulator', function () {

    const RockPaperScissorsTournamentSimulator = require('./rock-paper-scissors-tournament-simulator.js');

    describe('loadData', function() {

        it('should properly load the instruction array', function () {
            const rockPaperScissorsTournamentSimulator = new RockPaperScissorsTournamentSimulator(true);
            const expectedInstructionArray = [
                {opponent:'rock', mine:'paper'},
                {opponent:'paper', mine:'rock'},
                {opponent:'scissors', mine:'scissors'}
            ];
            expect(rockPaperScissorsTournamentSimulator.instructionArray).toEqual(expectedInstructionArray);
        });

    });

    describe('getScoreForMatchup', function() {

        it('should return the correct score for each matchup', function () {
            const rockPaperScissorsTournamentSimulator = new RockPaperScissorsTournamentSimulator(true);
            expect(rockPaperScissorsTournamentSimulator.getScoreForMatchup({opponent:'rock', mine:'paper'})).toEqual(8);
            expect(rockPaperScissorsTournamentSimulator.getScoreForMatchup({opponent:'paper', mine:'rock'})).toEqual(1);
            expect(rockPaperScissorsTournamentSimulator.getScoreForMatchup({opponent:'scissors', mine:'scissors'})).toEqual(6);
        });

    });

    describe('getTotalScore', function() {

        it('should return the sum of all matches in the tournament', function () {
            const rockPaperScissorsTournamentSimulator = new RockPaperScissorsTournamentSimulator(true);
            expect(rockPaperScissorsTournamentSimulator.getTotalScore()).toEqual(15);
        });

    });

});