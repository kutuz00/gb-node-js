const colors = require("colors/safe");
let count = 1;
let prevCount;
let step = 2;
const primeNumbers = [];

let num = +process.argv[2];
let top = +process.argv[3];
const onError = () => {
    const errorMessage = new Error('Argument - Not a number!!!!!!');
    console.error(colors.red(errorMessage.message));
    return process.exit(1);
}

const primeNumbersFilter = () => {
    while (num <= top) {
        if (num <= 2) {
            if (num <= 1) ++num;
            else {
                primeNumbers.push(num);
                ++num
            };
        }
        else if (num % step === 0 && num > step) {
            step = 2;
            ++num;
        }
        else if (num % step != 0) {
            step++;
        }
        else if (num === step) {
            primeNumbers.push(num);
            ++num;
            step = 2;
        }

    }
}
if ((typeof (num) === "number") && (typeof (top) === "number") && (!isNaN(num)) && (!isNaN(top))) {
    primeNumbersFilter();
}
else { onError() };
const primeNumberColor = (number) => {
    number ? count : count = 0;
    switch (count) {
        case 1:
            console.log(colors.green(number));
            count++;
            break;
        case 2:
            console.log(colors.yellow(number));
            prevCount = count;
            count++;
            break;
        case 3:
            console.log(colors.red(number));
            count = count - prevCount;
            break;
        default:
            console.log(colors.red("No prime numbers!"));
            break;

    }

}


primeNumbers.length > 0 ? primeNumbers.map((number) => primeNumberColor(number)) : primeNumberColor(false);

