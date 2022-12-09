describe('RockPaperScissorsTournamentSimulator', function () {

    const RockPaperScissorsTournamentSimulator = require('./rock-paper-scissors-tournament-simulator.js');

    describe('loadData', function() {

        it('should properly load the instruction array', function () {
            const rockPaperScissorsTournamentSimulator = new RockPaperScissorsTournamentSimulator(true);
            const expectedInstructionArray = [
                {opponent:'rock', mine:'paper', desiredOutcome: 'draw'},
                {opponent:'paper', mine:'rock', desiredOutcome: 'lose'},
                {opponent:'scissors', mine:'scissors', desiredOutcome: 'win'}
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

    describe('getScoreForMatchupPart2', function() {

        it('should return the correct score for each matchup using the rules from part 2', function () {
            const rockPaperScissorsTournamentSimulator = new RockPaperScissorsTournamentSimulator(true);
            expect(rockPaperScissorsTournamentSimulator.getScoreForMatchupPart2({opponent:'rock', mine:'paper', desiredOutcome: 'draw'})).toEqual(4);
            expect(rockPaperScissorsTournamentSimulator.getScoreForMatchupPart2({opponent:'paper', mine:'rock', desiredOutcome: 'lose'})).toEqual(1);
            expect(rockPaperScissorsTournamentSimulator.getScoreForMatchupPart2({opponent:'scissors', mine:'scissors', desiredOutcome: 'win'})).toEqual(7);
        });

    });

    describe('getTotalScorePart2', function() {

        it('should return the sum of all matches in the tournament using the rules from part 2', function () {
            const rockPaperScissorsTournamentSimulator = new RockPaperScissorsTournamentSimulator(true);
            expect(rockPaperScissorsTournamentSimulator.getTotalScorePart2()).toEqual(12);
        });

    });


});