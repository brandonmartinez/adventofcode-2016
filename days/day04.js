var fs = require('fs'),
    path = process.cwd();

function processLetterCounts(encryptedString) {
    var uniqueLetters = encryptedString.replace(/\-/g, '').split('').filter(function (item, i, ar) {
            return ar.indexOf(item) === i;
        }).sort(),
        letterCounts = [];

    uniqueLetters.forEach(function (letter) {
        var letterMatches = encryptedString.split(letter);
        letterCounts.push([letter, letterMatches.length - 1]);
    }, this);

    return letterCounts.sort(function (a, b) {
        // Check if count is higher first (descending)
        if (a[1] > b[1]) {
            return -1;
        }

        if (a[1] < b[1]) {
            return 1;
        }

        // Check if letter value is higher (ascending)
        if (a[0] < b[0]) {
            return -1;
        }

        if (a[0] > b[0]) {
            return 1;
        }

        return 0;
    });
}

function processRegexRawInput(rawString) {
    var groupRegEx = /([a-z\-]+)\-([\d]+)\[([a-z]{5})\]/g,
        match = groupRegEx.exec(rawString),
        formatted = {
            encryptedString: match[1],
            uniqueLetters: processLetterCounts(match[1]),
            sectorId: parseInt(match[2], 10),
            checksum: match[3].split('')
        };

    return formatted;
}

function processRawInput(rawInput) {
    var splitInput = rawInput.split('\n'),
        processedInput = [];

    splitInput.forEach(function (s) {
        var p = processRegexRawInput(s);
        processedInput.push(p);
    }, this);

    return processedInput;
}

function decryptShiftCypher(str, amount) {

    // Wrap the amount
    if (amount < 0)
        return decryptShiftCypher(str, amount + 26);

    // Make an output variable
    var output = '';

    // Go through each character
    for (var i = 0; i < str.length; i++) {
        var character = str[i],
            code = str.charCodeAt(i);
        if (character === '-') {
            output += ' ';
        } else {
            output += String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
    }

    // All done!
    return output;

}

function stripDecoyData(sets) {
    var matchedSets = [];

    sets.forEach(function (set) {
        var matched = true;
        for (var i = 0; i < set.checksum.length; i++) {
            if (set.uniqueLetters[i][0] !== set.checksum[i]) {
                matched = false;
            }
        }
        if (matched) {
            set.decryptedString = decryptShiftCypher(set.encryptedString, set.sectorId);
            matchedSets.push(set);
        }
    }, this);

    return matchedSets;
}

function puzzle1(sets) {
    var matchedSets = stripDecoyData(sets);
    var sectorIdSum = 0;

    matchedSets.forEach(function (set) {
        sectorIdSum += set.sectorId;
    }, this);

    return sectorIdSum;
}

function puzzle2(sets) {
    var matchedSets = stripDecoyData(sets),
        northPoleSectorId;

    matchedSets.forEach(function (set) {
        if (set.decryptedString.includes('northpole')) {
            northPoleSectorId = set.sectorId;
        }
    }, this);

    return northPoleSectorId;
}


module.exports = function () {
    console.log('---DAY 04-----------------');

    // Load input from file, split based on line then whitespace
    var rawInput = fs.readFileSync(path + '/days/' + 'day04input.txt', 'utf8');
    splitInput = processRawInput(rawInput);

    // Puzzle 1
    var puzzle1Answer = puzzle1(splitInput);
    console.log('--- Puzzle 1 - Answer: ' + puzzle1Answer + '.');

    // Puzzle 2
    var puzzle2Answer = puzzle2(splitInput);
    console.log('--- Puzzle 2 - Answer: ' + puzzle2Answer + '.');
};