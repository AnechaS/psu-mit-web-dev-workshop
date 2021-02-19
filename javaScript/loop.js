
// for loop
console.log('for loop');

for (let i = 0; i < 5; i++) {
    console.log(i);
}


// white loop
console.log('white loop');

let n = 0;
while (n < 5) {
    console.log(n);

    n += 1;
}

console.log('do white');

n = 0;
do {
    console.log(n);

    n += 1;
} while(n < 5);

// array
let cars = ['honda', 'toyota', 'bmw', 'nisson'];

/* for (let index = 0; index < cars.length; index++) {
    const car = cars[index];
    console.log(car);   
} */

/* for (const key in cars) {
    const car = cars[key];
    console.log(car);
} */

cars.forEach(function (car) {
    console.log(car);
});

// collection
let collection = [
    {
        name: 'honda',
    },
    {
        name: 'toyora',
    }
];

/* for (const object of collection) {
    console.log(object);
} */

collection.forEach(object => {
    console.log(object);
});
