var fs = require('fs'),
    md5 = require('md5'),
    path = process.cwd();

function puzzle1(input) {
    var password = '';

    for (var i = 0; password.length < 8; i++) {
        var stringToHash = input + i.toString(),
            hash = md5(stringToHash),
            substringToCheck = hash.substring(0, 5);
        if (i % 10000 === 0) {
            console.log('Numbers up to ' + i + ' checked.');
        }

        if (substringToCheck === '00000') {
            password += hash[5];
        }
    }

    return password;
}

function puzzle2(input) {
    return '';
}


module.exports = function () {
    console.log('---DAY 05-----------------');

    // Load input from file, split based on line then whitespace
    var rawInput = 'ffykfhsq';

    // Puzzle 1
    var puzzle1Answer = puzzle1(rawInput);
    console.log('--- Puzzle 1 - Answer: ' + puzzle1Answer + '.');

    // Puzzle 2
    var puzzle2Answer = puzzle2(splitInput);
    console.log('--- Puzzle 2 - Answer: ' + puzzle2Answer + '.');
};