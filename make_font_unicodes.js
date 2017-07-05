const fs = require('fs');

const generateArray = (input, min, max) => {
    let output = input
    for (let i = min; i <= max; i++) {
        output.push(i);
        //console.log(i)
    }
    //console.log(output);
    return output;
}

const intialArr = []
let unicodes = generateArray(intialArr, 161, 383);

unicodes = generateArray(unicodes, 902, 274);
unicdoes = generateArray(unicodes, 1024, 1119);
unicodes = generateArray(unicodes, 8592, 8595);

fs.writeFile('unicodes.txt', unicodes);