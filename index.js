// compare lie lists

// import libraries
const fs = require('fs-extra');

// import local modules
const compareFiles = require('./modules/compare-files');

// variables
const csvPath = './data/LMI-B_curat_cu-categorii.csv';

// ////////////////////////////////////////////////////////////////////////////
// // METHODS

// ////////////////////////////////////////////////////////////////////////////
// // MAIN function
function main () {

  // help text
  const helpText = `\n Available commands:\n\n\
  1. -h : display help text\n\
  2. -c [path_A] [path_B]: copy coordonates columns from array B to array A, if street-name an street-no is the same.\n\
  3. -mf : copy & rename files from given inFolder to given outFolder\n`;

  // get command line arguments
  const arguments = process.argv;
  console.log('\x1b[34m%s\x1b[0m', '\n@START: CLI arguments >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.table(arguments);
  console.log('\n');

  // get third command line argument
  // if third argument is missing, -h is set by default
  const mainArg = process.argv[2] || '-h';
  // get the rest of the arguments
  const inPathArg = process.argv[3];
  const outPathArg = process.argv[4];

  // run requested command
  // 1. if argument is 'h' or 'help' print available commands
  if (mainArg === '-h') {
    console.log(helpText);

    // 2. else if argument is 'pf'
  } else if (mainArg === '-c') {
    // process all image files
    console.log('\x1b[34m%s\x1b[0m', '\nCompare files');

    // check in and out path arguments
    if (fs.pathExistsSync(inPathArg) && fs.pathExistsSync(outPathArg)) {
      compareFiles(inPathArg, outPathArg);

      // if path args are invalid or missing print error msg
    } else {
      console.log(`ERR: input path and/or output path is missing or invalid!`);
    };

    // 3. else if argument is 'mf'
  } else if (mainArg === '-mf') {
    // copy & rename & add GPS cdd to new file
    console.log('\x1b[34m%s\x1b[0m', '\nCopy & rename image files');

    // else print help
  } else {
    console.log(helpText);
  }

}


// ////////////////////////////////////////////////////////////////////////////
// // MAIN
main();