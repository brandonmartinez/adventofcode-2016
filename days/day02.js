var puzzle1Grid = [
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
    ],
    puzzle1Processor = {
        U: function (x, y) {
            y++;

            return {
                x: x,
                y: (y > 2) ? 2 : y
            };
        },
        D: function (x, y) {
            y--;

            return {
                x: x,
                y: (y < 0) ? 0 : y
            };
        },
        L: function (x, y) {
            x--;

            return {
                x: (x < 0) ? 0 : x,
                y: y
            };
        },
        R: function (x, y) {
            x++;

            return {
                x: (x > 2) ? 2 : x,
                y: y
            };
        }
    },
    puzzle2Grid = [
        [null, null, 13, null, null],
        [null, 10, 11, 12, null],
        [5, 6, 7, 8, 9],
        [null, 2, 3, 4, null],
        [null, null, 1, null, null]
    ],
    puzzle2Lookup = [
        [4, 2],
        [3, 1],
        [3, 2],
        [3, 3],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [1, 1],
        [1, 2],
        [1, 3],
        [0, 2]
    ],
    puzzle2Processor = {
        U: function (x, y) {
            if (y !== 2 && !(Math.abs(x) === 1 && y === 1) && Math.abs(x) !== 2) {
                y++;
            }

            return {
                x: x,
                y: y
            };
        },
        D: function (x, y) {
            if (y !== -2 && !(Math.abs(x) === 1 && y === -1) && Math.abs(x) !== 2) {
                y--;
            }

            return {
                x: x,
                y: y
            };
        },
        L: function (x, y) {
            if (x !== -2 && !(Math.abs(y) === 1 && x === -1) && Math.abs(y) !== 2) {
                x--;
            }

            return {
                x: x,
                y: y
            };
        },
        R: function (x, y) {
            if (x !== 2 && !(Math.abs(y) === 1 && x === 1) && Math.abs(y) !== 2) {
                x++;
            }

            return {
                x: x,
                y: y
            };
        }
    };

function calculateNumberPuzzle1(startingNumber, set) {
    // Calculate the X/Y for the location (we're flipping the Y since our numbers don't start at the origin)
    var x = (startingNumber - 1) % 3,
        y = Math.floor(Math.abs((startingNumber - 9)) / 3);

    set.forEach(function (direction) {
        var shifted = puzzle1Processor[direction](x, y);
        x = shifted.x;
        y = shifted.y;
    }, this);

    return puzzle1Grid[y][x];
}

function calculateNumberPuzzle2(startingNumber, set) {
    var x = puzzle2Lookup[startingNumber - 1][1] - 2,
        y = puzzle2Lookup[startingNumber - 1][0] - 2;

    set.forEach(function (direction) {
        var shifted = puzzle2Processor[direction](x, y);
        x = shifted.x;
        y = shifted.y;
    }, this);

    return puzzle2Grid[y + 2][x + 2];
}

function puzzleProcessor(inputs, calculator) {
    var location = 5,
        finalNumber = '';

    for (var i = 0; i < inputs.length; i++) {
        location = calculator(location, inputs[i]);

        finalNumber += location.toString(16);
    }

    return finalNumber;
}

module.exports = function () {
    console.log('---DAY 02-----------------');

    var rawInput1 = 'RLRDDRLLDLRLUDDULLDRUUULDDLRLUDDDLDRRDUDDDLLURDDDLDDDRDURUDRDRRULUUDUDDRRRLRRRRRLRULRLLRULDRUUDRLRRURDDRLRULDLDULLLRULURRUULLRLLDDDDLLDURRUDLDLURDRDRDLUUUDDRDUUDDULLUURRDRLDDULURRRUDLLULULDLLURURUDRRRRUDRLRDLRRLDDRDDLULDLLLURURDUDRRRRUULURLRDULDRLUDRRUDDUULDURUDLDDURRRDLULLUUDRLLDUUDLDRUDDRLLLLLLDUDUDDLRDLRRDRUDDRRRLLRRDLLRLDDURUURRRDDLDUULLDLDLRURDLLLDDRUUDRUDDDDULRLLDUULRUULLLULURRRLLULDLDUDLDLURUDUDULLDLLUUDRRDRLUURURURURDLURUUDLDRLUDDUUDULDULULLLDLDDULLULLDULRRDRULLURRRULLDDDULULURLRDURLLURUDDULLRUDLRURURRDRDUULDRUUDURDURDDLRDUUULDUUDRDURURDRRRURLLDDLLLURURULULUDLRDLDRDRURLRLULRDLU',
        rawInput2 = 'UDLDURRULDRDDLDUULUDLDUULUURDDRUDRURRRUDRURLLDDRURLDLRDUUURDLLULURDDUDDDRRRURLLDLDLULRDULRLULDLUUDLLRLDLRUUULDDUURDLDDRRDLURLDUDDRURDRRURDURRRLUULURDDLRDLDRRRLDUDRLRLLRLDDUULDURUUULLLRRRRRRRDRRRDRLUULDLDDLULDRDUDLLUDRRUDRUUDULRLUURDDDDRRUUDLURULLLURDULUURDRDDURULRUDRRDLRDUUUUUDDDRDRDDRUDRDDDRLRUUDRDRDDDLUDRDRLDRDDRULURDRLDRUDUDRUULRLLUDRDRLLLLDUDRRLLURDLLLDRRUDDUDRLRLDUDRLURRUUULURDDRUURRLDRLRRRUUDLULDDDRDLDUUURLLUULDDRRUDLDDRUDUDUURURDDRDULLLLLULRRRDLRRRDDDLURDDDDLUULLLRDDURRRRLURRLDDLRUULULRDRDDDDLDUUUUUUDRRULUUUDD',
        rawInput3 = 'UURDRRUDLURRDDDLUDLRDURUDURDLLLLRDLRLRDDRDRDUUULRDLLDLULULRDUDDRRUUDURULDLUDLRDRUDLDDULLLDDRDLLDULLLURLLRDDLDRDULRRDDULRDURLLRUDRLRRLUDURLDRDLDLRLLLURLRRURDLDURDLUDULRDULLLDRDDRDLDRDULUULURDRRRLDRRUULULLDDRRLDLRUURLRUURLURRLLULUUULRLLDDUDDLRLDUURURUDLRDLURRLLURUDLDLLUDDUULUUUDDDURDLRRDDDLDRUDRLRURUUDULDDLUUDDULLDDRRDDRRRUDUDUDLDLURLDRDLLLLDURDURLRLLLUUDLRRRRUDUDDLDLRUURRLRRLUURRLUDUDRRRRRRRLDUDDRUDDLUDLRDDDRLDUULDRDRRDLDRURDLDRULRLRLUDRDLRRUURUUUUDLDUUULLLRRRRRDLRRURDDLLLLUULDLLRULLUDLLDLLUDLRLRRLRURDDRRL',
        rawInput4 = 'URDRDLLRDDDLLLDDLURLRURUURRRLUURURDURRLLUDURRLRLDLUURDLULRRDRUDDLULDLDRLDLRLRRLLLDDDUDDDLRURURRLLDRRRURUDLRDDLLDULDDLDRLUUUDRRRULDUULRDDDLRRLLURDDURLULRDUDURRLLDLLRLDUDDRRDDLRLLLDUDRLUURRLLDULRLDLUUUUUDULUDLULUDDUURRURLDLDRRLDLRRUDUDRRDLDUDDLULLDLLRDRURDRDRRLDDDDRDDRLLDDDLLUDRURLURDRRRRRUDDDUDUDDRDUUDRRUDUDRLULDDURULUURUUUURDRULRLRULLDDRRRUULRRRRURUDLDLRDLLDRLURLRUULLURDUDULRRURLRLLRRLLLURULRRRLDDUULLUUULRRDRULUUUUDRDRRDLRURLRLLRLRRRDRDRLDLUURUURULLDLULRRLRRDRULRRLLLDDURULLDLDLDLUUURDLDLUUDULRLLUDDRRDLLDLDLDURLUURRDDRRURDRLUDRLUUUDLDULDLUDRLDUDDLLRUDULLLLLDRRLLUULLUUURRDDUURDLLRDDLRLLU',
        rawInput5 = 'LDUDRRDLUUDDRLLUUULURLDUDLUDLRLDRURLULRLLDDLRRUUUDDDDRDULDDUUDLRUULDRULLRDRUDDURLDUUURRUDUDRDRDURRDLURRRDRLDLRRRLLLRLURUURRDLLRDLDDLLRDUDDRDUULRULRRURLUDDUDDDUULLUURDULDULLLLRUUUDDRRRLDDDLDLRRDRDRDLUULRLULDRULDLRDRRUDULUDLLUDUULRDLRRUUDDLLDUDDRULURRLULDLDRRULDDRUUDDLURDLRDRLULRRLURRULDUURDLUDLLDRLDULLULDLLRDRDLLLUDLRULLRLDRDDDLDDDLRULDLULLRUUURRLLDUURRLRLDUUULDUURDURRULULRUUURULLLRULLURDDLDRLLRDULLUDLDRRRLLLLDUULRRLDURDURDULULDUURLDUDRLRURRDLUUULURRUDRUUUDRUR';

    // TEST DATA
    // rawInput1 = 'ULL';
    // rawInput2 = 'RRDDD';
    // rawInput3 = 'LURDL';
    // rawInput4 = 'UUUUD';

    var splitInput1 = rawInput1.split(''),
        splitInput2 = rawInput2.split(''),
        splitInput3 = rawInput3.split(''),
        splitInput4 = rawInput4.split(''),
        splitInput5 = rawInput5.split(''),
        inputs = [splitInput1, splitInput2, splitInput3, splitInput4, splitInput5];

    // TEST DATA
    // inputs = [splitInput1, splitInput2, splitInput3, splitInput4];

    // Puzzle 1
    var puzzle1Answer = puzzleProcessor(inputs, calculateNumberPuzzle1);
    // Should be 18843
    console.log('--- Puzzle 1 - Answer: ' + puzzle1Answer + '.');

    // Puzzle 2
    var puzzle2Answer = puzzleProcessor(inputs, calculateNumberPuzzle2);
    // Should be 67BB9
    console.log('--- Puzzle 2 - Answer: ' + puzzle2Answer.toUpperCase() + '.');
};