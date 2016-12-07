var fs = require('fs'),
    path = process.cwd();

function containsAbba(input) {
    // Default to 4
    var len = 4;

    if (input.length < len) {
        return false;
    }

    // Sliding window to determine if we've found an ABBA
    for (var l = len - 1; l < input.length; l++) {
        // 0 & 3
        // 1 & 2
        if (input[l - len + 1] === input[l] &&
            input[l - len + 2] == input[l - 1] &&
            input[l - len + 1] !== input[l - len + 2]) {
            return true;
        }
    }

    return false;

}

function puzzle1(sets) {
    var validSets = [];

    for (var i = 0; i < sets.length; i++) {
        var hasValidAbba = false,
            hasInvalidAbba = false,
            regex = /(\[[a-z]+\])|([a-z]+)/g,
            str = sets[i],
            m;

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach(function (match, groupIndex) {
                // Group 1 should *not* have an ABBA
                if (match && groupIndex == 1) {
                    if (containsAbba(match.replace(/\[\]/g, ''))) {
                        hasInvalidAbba = true;
                    }
                }

                if (match && groupIndex === 2) {
                    if (containsAbba(match)) {
                        hasValidAbba = true;
                    }
                }
            });
        }

        if (hasValidAbba && !hasInvalidAbba) {
            validSets.push(str);
        }
    }

    return validSets.length;
}

function puzzle2(sets) {
    return '';
}


module.exports = function () {
    console.log('---DAY 07-----------------');

    // Load input from file, split based on line then whitespace
    var rawInput = fs.readFileSync(path + '/days/' + 'day07input.txt', 'utf8');
    splitInput = rawInput.split(/\s+/g);

    // Puzzle 1
    var puzzle1Answer = puzzle1(splitInput);
    console.log('--- Puzzle 1 - Answer: ' + puzzle1Answer + '.');

    // Puzzle 2
    var puzzle2Answer = puzzle2(splitInput);
    console.log('--- Puzzle 2 - Answer: ' + puzzle2Answer + '.');
};