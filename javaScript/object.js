let Car = {
    name: 'hondar',
    color: 'black',
    show: function() {
        console.log(this.name, 'color', this.color);
    }
};

console.log(Car.name);
console.log(Car['color']);
Car.show()

// Class

// ES5
function Notbook(name, color) {
    this.name = name;
    this.color = color;
}

Notbook.prototype.show = function() {
    console.log(this.name, 'color', this.color);
}

const asus = new Notbook('asus', 'black');
console.log(asus.name);
console.log(asus.color);
asus.show();

// ES6
class Phone {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    show() {
        function t() {
            console.log(this);
        }

        t();

        const a = () => {
            console.log(this);
        };

        a();

        console.log(this.name, 'color', this.color);
    }
}

const iphone = new Phone('iphone6', 'white');
console.log(iphone.name);
console.log(iphone.color);
iphone.show();


const { name, color } = iphone;
console.log(name, color);