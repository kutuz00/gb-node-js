// const locations = {
//     readLocation: './etc/access.log',
//     writeLocation: {
//         pathToFileOne: './etc/89.123.1.41_requests.log',
//         pathToFileTwo: './etc/34.48.240.111_requests.log'
//     }
// }
// const fs = require('fs');
// const readline = require('readline');
// const readStream = fs.createReadStream(locations.readLocation);

// const interface = readline.createInterface({
//     input: readStream,
// });

// const toFile = (line, path) => {
//     const writeStream = fs.createWriteStream(path, {
//         encoding: 'utf-8',
//         flags: 'a',
//     });
//     interface.output = writeStream;
//     interface.output.once('error', (err) => console.log(err));
//     interface.output.write(line + '\n');
//     interface.output.end();
// };

// interface.on('line', (line) => {

//     if (line.toString().match(/89.123.1.41/g)) {
//         toFile(line, locations.writeLocation.pathToFileOne);
//     }
//     else if (line.toString().match(/34.48.240.111/g)) {
//         toFile(line, locations.writeLocation.pathToFileTwo);
//     }

// }).on('close', () => {
//     console.log('End of file!');
// });
