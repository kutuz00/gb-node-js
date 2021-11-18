

// console.log('Record 1'); // 1

// setTimeout(() => {
//     console.log('Record 2'); // 4
//     Promise.resolve().then(() => {
//         setTimeout(() => {
//             console.log('Record 3'); // 5
//             Promise.resolve().then(() => {
//                 console.log('Record 4'); // 6
//             });
//         });
//     });
// });

// console.log('Record 5'); // 2

// Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6'))); // 3
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Params mm/dd/yyyy hh:mm:ss - ex.11/18/2021 01:31:00
const params = process.argv[2] + ' ' + process.argv[3];
const generateCountdown = () => {
    const stopTime = new Date(params);
    const currentTime = new Date();
    return countdown = stopTime - currentTime;
}

const createNewCountdown = async () => {
    emitter.emit('TimeLeft', new Date(generateCountdown()));
    await new Promise(resolve => setTimeout(resolve, 1000));
    await createNewCountdown();
}

class Handler {
    static hours = (countdown) => {

        countdown / 3600000 >= 1 ? console.log('hours:', Math.floor(countdown / 3600000)) : console.log("Timer is over!");
    }
    static minutes(countdown) {

        countdown / 60000 >= 1 ? console.log('minutes:', Math.floor((countdown / 3600000 - Math.floor(countdown / 3600000)) * 60)) : console.log("Timer is over!");
    }
    static seconds(countdown) {

        countdown >= 1 ? console.log('seconds:', Math.floor((countdown % 60000) / 1000)) : console.log("Timer is over!");
    }
}

emitter.on('TimeLeft', Handler.hours);
emitter.on('TimeLeft', Handler.minutes);
emitter.on('TimeLeft', Handler.seconds);
createNewCountdown();

