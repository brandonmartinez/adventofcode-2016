var fs = require('fs'),
    path = process.cwd();

function isValidTriangle(set) {
    return (set[0] + set[1] > set[2])
        && (set[1] + set[2] > set[0])
        && (set[0] + set[2] > set[1]);
}

function puzzle1(sets) {
    var validTriangles = [];

    sets.forEach(function(set) {
        if(isValidTriangle(set)){
            validTriangles.push(set);
        }
    }, this);
    
    return validTriangles.length;
}

function puzzle2() {
    return '';
}


module.exports = function () {
    console.log('---DAY 03-----------------')

    // Load input from file, split based on line then whitespace
    var rawInput = fs.readFileSync(path + '/days/' + 'day03input.txt', 'utf8');
    splitInput = rawInput.split('\n'),
        splitSplitInput = [];

    splitInput.forEach(function (i) {
        var arr = i.trim().split(/\W+/),
            intArr = [
                parseInt(arr[0], 10),
                parseInt(arr[1], 10),
                parseInt(arr[2], 10)
            ];

        splitSplitInput.push(intArr);
    }, this);

    console.log(splitSplitInput);

    // Puzzle 1
    var puzzle1Answer = puzzle1(splitSplitInput);
    console.log('--- Puzzle 1 - Answer: ' + puzzle1Answer + '.');

    // Puzzle 2
    var puzzle2Answer = puzzle2(splitInput);
    console.log('--- Puzzle 2 - Answer: ' + puzzle2Answer + '.');
};