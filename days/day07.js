var fs = require('fs'),
    path = process.cwd();

function containsPalindromeOfSpecifiedLength(input, length) {
    var len = length,
        center = Math.floor(length / 2),
        odd = center % 2,
        matches = [];

    if (!length || input.length < len) {
        return false;
    }

    // Sliding window to determine if we've found a palindrome
    for (var l = 0; l < input.length - length + 1; l++) {
        var substring = input.substring(l, l + length),
            invalidated = false;

        for (var i = 0; i < center; i++) {
            if (substring[i] !== substring[length - i - 1]) {
                invalidated = true;
            }

            // Current character cannot exist prior
            for (var p = 0; p < i; p++) {
                if (substring[p] === substring[i]) {
                    invalidated = true;
                }
            }

            if (odd && substring[center] === substring[i]) {
                invalidated = true;
            }
        }

        if (!invalidated) {
            matches.push(substring);
        }
    }

    return matches.length === 0 ? null : matches;
}

function abaContainsBab(potentialAbas, potentialBabs) {
    var found = false;

    potentialAbas.forEach(function (aba) {
        potentialBabs.forEach(function (bab) {
            var inverted = bab[1] + bab[0] + bab[1];
            if (aba === inverted) {
                found = true;
            }
        });
    }, this);

    return found;
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
                    if (containsPalindromeOfSpecifiedLength(match.replace(/\[\]/g, ''), 4)) {
                        hasInvalidAbba = true;
                    }
                }

                if (match && groupIndex === 2) {
                    if (containsPalindromeOfSpecifiedLength(match, 4)) {
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
    var validSets = [];

    for (var i = 0; i < sets.length; i++) {
        var regex = /(\[[a-z]+\])|([a-z]+)/g,
            str = sets[i],
            m,
            potentialAbas = [],
            potentialBabs = [];

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach(function (match, groupIndex) {
                if (match && groupIndex == 1) {
                    var matchedBabs = containsPalindromeOfSpecifiedLength(match.replace(/\[\]/g, ''), 3);
                    if (matchedBabs) {
                        potentialBabs = potentialBabs.concat(matchedBabs);
                    }
                }

                if (match && groupIndex === 2) {
                    var matchedAbas = containsPalindromeOfSpecifiedLength(match, 3);
                    if (matchedAbas) {
                        potentialAbas = potentialAbas.concat(matchedAbas);
                    }
                }
            });
        }

        if (potentialAbas.length > 0 && potentialBabs.length > 0 && abaContainsBab(potentialAbas, potentialBabs)) {
            validSets.push(str);
        }
    }

    return validSets.length;
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