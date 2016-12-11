var fs = require('fs'),
    path = process.cwd();

function decompressData(input) {
    var decompressedOutput = '',
        i = 0;

    while (i < input.length) {
        // Grab the working substring
        var markerRegex = /\((\d+)x(\d+)\)/,
            inputSubstring = input.substring(i),
            m = markerRegex.exec(inputSubstring),
            newOutputAddition = '';

        if (m) {
            // If the next marker isn't at the start of the substring, grab the characters as data and append
            if (m.index !== 0) {
                newOutputAddition += inputSubstring.substring(0, m.index);
                inputSubstring = inputSubstring.substring(m.index);
            }

            // Get length and repeat
            var charactersToRepeat = parseInt(m[1], 10),
                repeatNumber = parseInt(m[2], 10),
                offset = m[0].length,
                repeatSubstring = inputSubstring.substring(offset, charactersToRepeat + offset);

            for (var r = 0; r < repeatNumber; r++) {
                newOutputAddition += repeatSubstring;
            }

            i += m.index + offset + charactersToRepeat;
        } else {
            newOutputAddition += inputSubstring;
            i += inputSubstring.length + 1;
        }

        decompressedOutput += newOutputAddition;
    }

    return decompressedOutput;
}

function puzzle1(input) {
    var processedInput = decompressData(input);
    //console.log(processedInput);
    return processedInput.length;
}

function puzzle2(input) {
    return '';
}


module.exports = function () {
    console.log('---DAY 09-----------------');

    // Load input from file, split based on line then whitespace
    var rawInput = fs.readFileSync(path + '/days/' + 'day09input.txt', 'utf8');
    trimmedInput = rawInput.replace(/\s+/g, '');

    // Puzzle 1
    var puzzle1Answer = puzzle1(trimmedInput);
    console.log('--- Puzzle 1 - Answer: ' + puzzle1Answer + '.');

    // Puzzle 2
    var puzzle2Answer = puzzle2(trimmedInput);
    console.log('--- Puzzle 2 - Answer: ' + puzzle2Answer + '.');
};