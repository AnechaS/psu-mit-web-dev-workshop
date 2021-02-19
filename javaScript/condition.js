let score = 70;
// --if-else--
/* if (score == 50) {
    console.log('score is 50');
} else if (score > 60) {
    console.log('score greater than 50');
} else {
    console.log('score is not 50');
} */

// มากกว่าหรือเท่ากับ 80 => A
if (score >= 80) {
    console.log('A');
}
// มากกว่าหรือเท่ากับ 70 => B
else if (score >= 70) {
    console.log('B');
}
// มากกว่าหรือเท่ากับ 60 => C
else if (score >= 60) {
    console.log('C');
}
// มากกว่าหรือเท่ากับ 50 => D
else if (score >= 50) {
    console.log('D');
}
// น้อยกว่า 50 => E
else {
    console.log('E');
}

// --switch--
let name = 'gothen';

switch (name) {
    case 'Goku':
        console.log('name is goku');
        break;

    case 'Goten':
        console.log('name is goten');
        break;

    default:
        console.log('name is gohan');
        break;
}

// --operator--
let n = 2;
console.log(n < 2 ? 'n less than 2' : 'n greather than or equal 2');