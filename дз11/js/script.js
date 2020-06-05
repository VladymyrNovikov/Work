'use strict';

const SIZE_SMALL = { price: 50, callories: 20 };
const SIZE_MEDIUM = { price: 75, callories: 30 };
const SIZE_BIG = { price: 100, callories: 40 };

const TOPPING_CHEESE = { price: 10, callories: 20 };
const TOPPING_SALAD = { price: 20, callories: 5 };
const TOPPING_POTATO = { price: 15, callories: 10 };
const TOPPING_CURRY = { price: 15, callories: 0 };
const TOPPING_MAYO = { price: 20, callories: 5 };

function Hamburger(menuWarehouse) {
   this.price = menuWarehouse.price;
   this.callories = menuWarehouse.callories;
}

Hamburger.prototype.addTopping = function (topping) {
   this.price += topping.price;
   this.callories += topping.callories;
};

Hamburger.prototype.getPrice = function () {
   return this.price;
};

Hamburger.prototype.getCallories = function () {
   return this.callories;
};

const hamburger = new Hamburger(SIZE_MEDIUM);

hamburger.addTopping(TOPPING_MAYO);
hamburger.addTopping(TOPPING_POTATO);

console.log("Price with sauce: " + hamburger.getPrice());
console.log("Callories with sauce: " + hamburger.getCallories());