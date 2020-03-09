
// import libraries
const fs = require('fs-extra');

// paths
const outPath = './data/2020_LIE_matched.csv';


// ////////////////////////////////////////////////////////////////////////////////////////////
// // METHODS

// /////////////////////////////////////////////////////////////////////
// load csv file
function readCSV (filePath, delimiter) {
    // if file is found in path
    if (fs.existsSync(filePath)) {
        // return parsed file
        const newArray = fs.readFileSync(filePath, 'utf8').split('\n');
        return newArray.filter(line => line).map(line => line.split(delimiter || ','));
    };
    // else return empty object
    console.log('\x1b[31m%s\x1b[0m', `ERROR: ${filePath} file NOT found!`);
    return [];
};

// /////////////////////////////////////////////////////////////////////
// clean string
function cleanString (inString) {
    return inString
        .trim()
        .toLowerCase()
        .replace('ă', 'a')
        .replace('î', 'i')
        .replace('ş', 's')
        .replace('ţ', 't')
        .replace('â', 'a');
};

// /////////////////////////////////////////////////////////////////////
// clean street no
function cleanStrNo (inString) {
    return inString
        .trim()
        .toLowerCase()
        .replace('÷', '-')
        .replace('+', '-');
}

// ////////////////////////////////////////////////////////////////////////////////////////////
// // EXPORTS
module.exports = (pathA, pathB) => {
    // images counter
    let matchCounter = 0;

    // read arrays
    const arrayA = readCSV(pathA, '#');
    console.log(`Array A :: ${arrayA.length} items`);
    const arrayB = readCSV(pathB, '#');
    console.log(`Array B :: ${arrayB.length} items`);
    console.log(`Array A - B :: ${arrayA.length - arrayB.length} items\n`);

    // match items in array A to items in array B
    const arrayAadr = arrayA.map(item => `${cleanString(item[4])} ${cleanStrNo(item[6])}`);
    const arrayBadr = arrayB.map(item => `${cleanString(item[4])} ${cleanStrNo(item[6])}`);


    // for each item in A check if item is in B
    const arrayAA = arrayAadr.map((itemA, indexA) => {
        if (arrayBadr.includes(itemA)) {
            matchCounter += 1;
            matchBIndex = arrayBadr.indexOf(itemA);
            // console.log(`${arrayB[matchBIndex][0]} : ${arrayB[matchBIndex][17]}; ${arrayB[matchBIndex][18]}; ${arrayB[matchBIndex][19]}`);
            return [...arrayA[indexA], arrayB[matchBIndex][17], arrayB[matchBIndex][18], arrayB[matchBIndex][19]];
        } else {
            console.log(`${arrayA[indexA][0]} : ${arrayA[indexA][4]} ${arrayA[indexA][6]}`);
            return [...arrayA[indexA], '', '', '/Na'];
        };
    });

    // print result
    console.log(`\nArray AA :: ${matchCounter}/${arrayAA.length} matched items; ${arrayAA.length - matchCounter} items missing\n`);

    // write to file
    const outArray = arrayAA.map(item => item.join('#'));
    fs.writeFileSync(outPath, outArray.join('\n'));
    console.log('File write done!');
}
