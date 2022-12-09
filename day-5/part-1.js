const CargoCrateMover = require('./cargo-crate-mover.js');
const crgoCrateMover = new CargoCrateMover();
console.log(`Top Crates: ${crgoCrateMover.processAllInstructions()}`);
