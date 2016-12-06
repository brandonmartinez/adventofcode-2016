var fs = require('fs'),
    path = process.cwd();

function rotateStringsToArray(sets) {
    // each string needs to be broken into a character array
    var rotatedArray = [];
    for (var r = 0; r < sets.length; r++) {
        for (var c = 0; c < sets[r].length; c++) {
            if (r === 0) {
                rotatedArray.push([]);
            }

            rotatedArray[c].push(sets[r][c]);
        }
    }

    return rotatedArray;
}

function sortCountsDescending(counts) {
    var sortedCounts = Object.keys(counts).sort(function (a, b) {
        if (counts[a] > counts[b]) {
            return -1;
        }

        if (counts[a] < counts[b]) {
            return 1;
        }

        return 0;
    });

    return sortedCounts;
}

function sortCountsAscending(counts) {
    var sortedCounts = Object.keys(counts).sort(function (a, b) {
        if (counts[a] > counts[b]) {
            return 1;
        }

        if (counts[a] < counts[b]) {
            return -1;
        }

        return 0;
    });

    return sortedCounts;
}

function buildStringOfCharacters(rotatedArray, sortDescending) {
    var finalString = '';

    for (var a = 0; a < rotatedArray.length; a++) {
        var counts = {};

        for (var l = 0; l < rotatedArray[a].length; l++) {
            var letter = rotatedArray[a][l];
            counts[letter] = (counts[letter] || 0) + 1;
        }

        var sortedCounts = (sortDescending)? sortCountsDescending(counts) : sortCountsAscending(counts);

        finalString += sortedCounts[0];
    }

    return finalString;
}

function puzzle1(sets) {
    var rotatedArray = rotateStringsToArray(sets);
    return buildStringOfCharacters(rotatedArray, true);
}

function puzzle2(sets) {
    var rotatedArray = rotateStringsToArray(sets);
    return buildStringOfCharacters(rotatedArray, false);
}


module.exports = function () {
    console.log('---DAY 06-----------------');

    // Load input from file, split based on line then whitespace
    var rawInput = fs.readFileSync(path + '/days/' + 'day06input.txt', 'utf8');
    splitInput = rawInput.split(/\W+/g);

    // Puzzle 1
    var puzzle1Answer = puzzle1(splitInput);
    console.log('--- Puzzle 1 - Answer: ' + puzzle1Answer + '.');

    // Puzzle 2
    var puzzle2Answer = puzzle2(splitInput);
    console.log('--- Puzzle 2 - Answer: ' + puzzle2Answer + '.');
};