function calculateSteps(instructions) {
    var currentLocation = [0, 0],
        allStepsTaken = [
            // Include a copy of the origin
            currentLocation.slice()
        ],
        // 0 = North, 1 = East, 2 = South, 3 = West
        direction = 0;

    instructions.forEach(function (instruction) {
        var turn = instruction.charAt(0),
            steps = parseInt(instruction.substring(1), 10),
            previousLocation = currentLocation.slice(),
            x = previousLocation[0],
            y = previousLocation[1];

        if (turn === 'R') {
            direction++;
        } else {
            direction += 3;
        }

        if (direction > 3) {
            direction -= 4;
        }

        for (var i = 0; i < steps; i++) {
            switch (direction) {
                case 0:
                    x++;
                    break;
                case 1:
                    y++;
                    break;
                case 2:
                    x--;
                    break;
                case 3:
                    y--;
                    break;
            }

            allStepsTaken.push([x, y]);
        }

        currentLocation = [x, y];
    }, this);

    return {
        allLocations: allStepsTaken,
        currentLocation: currentLocation
    };
}

function puzzle1(instructions) {
    var calculation = calculateSteps(instructions),
        finalLocation = calculation.currentLocation;

    var blocksVertical = Math.abs(finalLocation[0]),
        blocksHorizontal = Math.abs(finalLocation[1]),
        blocksTotal = blocksVertical + blocksHorizontal;
    return blocksTotal;
}

function puzzle2(instructions) {
    var calculation = calculateSteps(instructions),
        locations = calculation.allLocations,
        locationCrossedTwice = null;

    // Cycle through all locations looking for a repeat
    for (var l1 = 0; l1 < locations.length && !locationCrossedTwice; l1++) {
        for (var l2 = 0; l2 < l1 && !locationCrossedTwice; l2++) {
            if (locations[l1][0] === locations[l2][0] && locations[l1][1] === locations[l2][1]) {
                locationCrossedTwice = locations[l2];
            }
        }
    }

    var blocksVertical = Math.abs(locationCrossedTwice[0]),
        blocksHorizontal = Math.abs(locationCrossedTwice[1]),
        blocksTotal = blocksVertical + blocksHorizontal;
    return blocksTotal;
}


module.exports = function () {
    console.log('---DAY 01-----------------')
    var rawInput = 'R4, R1, L2, R1, L1, L1, R1, L5, R1, R5, L2, R3, L3, L4, R4, R4, R3, L5, L1, R5, R3, L4, R1, R5, L1, R3, L2, R3, R1, L4, L1, R1, L1, L5, R1, L2, R2, L3, L5, R1, R5, L1, R188, L3, R2, R52, R5, L3, R79, L1, R5, R186, R2, R1, L3, L5, L2, R2, R4, R5, R5, L5, L4, R5, R3, L4, R4, L4, L4, R5, L4, L3, L1, L4, R1, R2, L5, R3, L4, R3, L3, L5, R1, R1, L3, R2, R1, R2, R2, L4, R5, R1, R3, R2, L2, L2, L1, R2, L1, L3, R5, R1, R4, R5, R2, R2, R4, R4, R1, L3, R4, L2, R2, R1, R3, L5, R5, R2, R5, L1, R2, R4, L1, R5, L3, L3, R1, L4, R2, L2, R1, L1, R4, R3, L2, L3, R3, L2, R1, L4, R5, L1, R5, L2, L1, L5, L2, L5, L2, L4, L2, R3',
        splitInput = rawInput.split(', ');

    // Puzzle 1
    var puzzle1Answer = puzzle1(splitInput);
    console.log('--- Puzzle 1 - Answer: ' + puzzle1Answer + ' blocks away.');

    // Puzzle 2
    var puzzle2Answer = puzzle2(splitInput);
    console.log('--- Puzzle 2 - Answer: ' + puzzle2Answer + ' blocks away.');
};