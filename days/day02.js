function calculateNumberPuzzle1(startingLocation, set) {
    var currentLocation = startingLocation;

    /*

    Bounds detection on this box:

    1 2 3
    4 5 6
    7 8 9

    There's probably a better way, but this works

    */

    set.forEach(function (direction) {
        var temporaryLocation = currentLocation;
        switch (direction) {
            case "U":
                temporaryLocation = currentLocation - 3;
                if (temporaryLocation > 0) {
                    currentLocation = temporaryLocation;
                }
                break;
            case "D":
                temporaryLocation = currentLocation + 3;
                if (temporaryLocation < 10) {
                    currentLocation = temporaryLocation;
                }
                break;
            case "L":
                temporaryLocation = currentLocation - 1;
                if (temporaryLocation > 0 && temporaryLocation !== 3 && temporaryLocation !== 6) {
                    currentLocation = temporaryLocation;
                }
                break;
            case "R":
                temporaryLocation = currentLocation + 1;
                if (temporaryLocation < 10 && temporaryLocation !== 4 && temporaryLocation !== 7) {
                    currentLocation = temporaryLocation;
                }
                break;
        }
    }, this);

    return currentLocation;
}

function calculateNumberPuzzle2(startingLocation, set) {
    var currentLocation = startingLocation;

    /*

    Bounds detection on this shape:

        1
      2 3 4
    5 6 7 8 9
      A B C
        D

    Maybe a better way? This is rough but it works.
    
    */

    set.forEach(function (direction) {
        switch (currentLocation) {
            case 1:
                if (direction === 'D') {
                    currentLocation = 3;
                }
                break;
            case 2:
                switch (direction) {
                    case 'R':
                        currentLocation = 3;
                        break;
                    case 'D':
                        currentLocation = 6;
                        break;
                }
                break;
            case 3:
                switch (direction) {
                    case 'L':
                        currentLocation = 2;
                        break;
                    case 'R':
                        currentLocation = 4;
                        break;
                    case 'U':
                        currentLocation = 1;
                        break;
                    case 'D':
                        currentLocation = 7;
                        break;
                }
                break;
            case 4:
                switch (direction) {
                    case 'L':
                        currentLocation = 3;
                        break;
                    case 'D':
                        currentLocation = 8;
                        break;
                }
                break;
            case 5:
                if (direction === 'R') {
                    currentLocation = 6;
                }
                break;
            case 6:
                switch (direction) {
                    case 'L':
                        currentLocation = 5;
                        break;
                    case 'R':
                        currentLocation = 7;
                        break;
                    case 'U':
                        currentLocation = 2;
                        break;
                    case 'D':
                        currentLocation = 10;
                        break;
                }
                break;
            case 7:
                switch (direction) {
                    case 'L':
                        currentLocation = 6;
                        break;
                    case 'R':
                        currentLocation = 8;
                        break;
                    case 'U':
                        currentLocation = 3;
                        break;
                    case 'D':
                        currentLocation = 11;
                        break;
                }
                break;
            case 8:
                switch (direction) {
                    case 'L':
                        currentLocation = 7;
                        break;
                    case 'R':
                        currentLocation = 9;
                        break;
                    case 'U':
                        currentLocation = 4;
                        break;
                    case 'D':
                        currentLocation = 12;
                        break;
                }
                break;
            case 9:
                if (direction === 'L') {
                    currentLocation = 8;
                }
                break;
            case 10:
                switch (direction) {
                    case 'R':
                        currentLocation = 11;
                        break;
                    case 'U':
                        currentLocation = 6;
                        break;
                }
                break;
            case 11:
                switch (direction) {
                    case 'L':
                        currentLocation = 10;
                        break;
                    case 'R':
                        currentLocation = 12;
                        break;
                    case 'U':
                        currentLocation = 7;
                        break;
                    case 'D':
                        currentLocation = 13;
                        break;
                }
                break;
            case 12:
                switch (direction) {
                    case 'L':
                        currentLocation = 11;
                        break;
                    case 'U':
                        currentLocation = 8;
                        break;
                }
                break;
            case 13:
                if (direction === 'U') {
                    currentLocation = 11;
                }
                break;
        }
    }, this);

    return currentLocation;
}

function puzzle1(inputs) {
    var location = 5,
        finalNumber = '';

    for (var i = 0; i < inputs.length; i++) {
        location = calculateNumberPuzzle1(location, inputs[i]);

        finalNumber += location.toString();
    }

    return finalNumber;
}

function puzzle2(inputs) {
    var location = 5,
        finalNumber = '';

    for (var i = 0; i < inputs.length; i++) {
        location = calculateNumberPuzzle2(location, inputs[i]);

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

    // Puzzle 1
    var puzzle1Answer = puzzle1(inputs);
    console.log('--- Puzzle 1 - Answer: ' + puzzle1Answer + '.');

    // Puzzle 2
    var puzzle2Answer = puzzle2(inputs);
    console.log('--- Puzzle 2 - Answer: ' + puzzle2Answer + '.');
};