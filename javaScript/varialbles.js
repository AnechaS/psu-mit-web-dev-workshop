// นี้คือ comment แบบ single-line

/*
 นี้คือ comment แบบ block
*/

// ตัวแปร
var msgHello = 'Hello';
msgHello = 'hello';

let msgHi = 'Hi';
msgHi = 'hi'

// ตัวแปรแบบ Constant
const msgHey = 'Hey';

console.log(msgHello);
console.log(msgHi);
console.log(msgHey);

// ประเภทข้อมูลตัวแปล
// String
let str = 'goku';
let color = "black";

console.log('var str is ' + str);
console.log('var str type is', typeof str);

console.log('var color is', color);
console.log('var color type is', typeof color);

// Number
let num = 12345;
console.log('var num is', num);
console.log('var num type is', typeof num);

// Bulean (true|false)
let bool = true;
console.log('var bool is', bool);
console.log('var bool type is', typeof bool);

// Object
let obj = {
    name: 'honda',
    color: 'white'
};

console.log('var obj is', obj);
console.log('var obj type is', typeof obj);
/* console.log('car name', obj.name);
console.log('car color', obj.color); */

let arr = ['red', 'black', 'green'];
console.log('var arr is', arr);
console.log('var arr type is', typeof arr);
console.log('var arr type is Array', arr instanceof Array);

console.log(arr[0]);