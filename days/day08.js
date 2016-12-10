var fs = require('fs'),
    path = process.cwd();

function createScreenArray(width, height) {
    var screen = [];
    for (var r = 0; r < height; r++) {
        var row = [];
        for (var c = 0; c < width; c++) {
            row.push(false);
        }
        screen.push(row);
    }

    return screen;
}

function fillRectangle(screen, width, height) {
    for (var r = 0; r < width; r++) {
        for (var c = 0; c < height; c++) {
            screen[r][c] = true;
        }
    }

    return screen;
}

function reverseShiftArray(arr, units) {
    // reverse the array, shift, and reverse again
    var newArr = arr.reverse();

    for (var c = 0; c < units; c++) {
        var shifted = newArr.shift();
        newArr.push(shifted);
    }

    return newArr.reverse();
}

function rotateRow(screen, row, units) {
    console.log(screen, row, units);
    var r = screen[row];
    console.log(r);
    screen[row] = reverseShiftArray(r, units);

    return screen;
}

function rotateColumn(screen, column, units) {
    // build an array
    var columns = [];

    for (var r = 0; r < screen.length; r++) {
        columns.push(screen[r][column]);
    }

    var shifted = reverseShiftArray(columns, units);

    for (r = 0; r < screen.length; r++) {
        screen[r][column] = shifted[r];
    }

    return screen;
}

function processCommand(screen, input) {
    var commandRegex = /[A-z\ ]*?(column|row|rect)[A-z =]+?([\d]+)[A-z\ ]+?([\d]+)/ig,
        m;

    while ((m = commandRegex.exec(input)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === commandRegex.lastIndex) {
            commandRegex.lastIndex++;
        }

        var x = parseInt(m[3], 10),
            y = parseInt(m[2], 10);

        switch (m[1]) {
            case 'rect':
                return fillRectangle(screen, x, y);
            case 'row':
                return rotateRow(screen, y, x);
            case 'column':
                return rotateColumn(screen, y, x);
        }
    }

    return screen;
}

function printScreen(screen) {
    var filledBits = 0;
    for (var r = 0; r < screen.length; r++) {
        var row = '';
        for (var c = 0; c < screen[r].length; c++) {
            if (screen[r][c]) {
                row += 'X';
                filledBits++;
            } else {
                row += 'o';
            }
        }
        console.log(row);
    }

    console.log();

    return filledBits;
}

function puzzle1(sets) {
    var screen = createScreenArray(50, 6);

    sets.forEach(function (set) {
        screen = processCommand(screen, set);
    }, this);

    return printScreen(screen);
}

function puzzle2(sets) {
    return '';
}

module.exports = function () {
    console.log('---DAY 08-----------------');

    // Load input from file, split based on line then whitespace
    var rawInput = fs.readFileSync(path + '/days/' + 'day08input.txt', 'utf8');
    splitInput = rawInput.split(/[\r\n]+/g);

    // Puzzle 1
    var puzzle1Answer = puzzle1(splitInput);
    console.log('--- Puzzle 1 - Answer: ' + puzzle1Answer + '.');

    // Puzzle 2
    var puzzle2Answer = puzzle2(splitInput);
    console.log('--- Puzzle 2 - Answer: ' + puzzle2Answer + '.');
};