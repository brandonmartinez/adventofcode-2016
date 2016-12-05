var fs = require('fs'),
    md5 = require('md5'),
    path = process.cwd();

function processRawInput(input) {
    var puzzle1Password = '',
        puzzle2PasswordCharacters = ['', '', '', '', '', '', '', ''],
        puzzle2Password = '';
    puzzle2CollectedCharacters = 0;

    for (var i = 0; puzzle1Password.length < 8 || puzzle2CollectedCharacters < 8; i++) {
        var stringToHash = input + i.toString(),
            hash = md5(stringToHash);

        if (hash.substring(0, 5) === '00000') {
            if (puzzle1Password.length < 8) {
                puzzle1Password += hash[5];
            }

            var position = parseInt(hash[5], 10);

            if (!isNaN(position) && position < 8 && !puzzle2PasswordCharacters[position]) {
                puzzle2PasswordCharacters[position] = hash[6];
                puzzle2CollectedCharacters++;
            }
        }
    }

    puzzle2PasswordCharacters.forEach(function (c) {
        puzzle2Password += c;
    }, this);

    return {
        puzzle1Answer: puzzle1Password,
        puzzle2Answer: puzzle2Password
    };
}

module.exports = function () {
    console.log('---DAY 05----------------- NOTE: this one takes a while to run');

    var rawInput = 'ffykfhsq';

    var results = processRawInput(rawInput);

    // Puzzle 1
    var puzzle1Answer = results.puzzle1Answer;
    console.log('--- Puzzle 1 - Answer: ' + puzzle1Answer + '.');

    // Puzzle 2
    var puzzle2Answer = results.puzzle2Answer;
    console.log('--- Puzzle 2 - Answer: ' + puzzle2Answer + '.');
};