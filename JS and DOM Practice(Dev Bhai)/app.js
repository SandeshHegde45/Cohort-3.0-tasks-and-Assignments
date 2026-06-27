/* 
Even or Odd Checker
Write a function that takes one number as input. Inside the function, check whether the
number divides evenly by 2 using the % (modulo) operator. If there is no remainder, the
function should return the word "Even"; otherwise, it should return "Odd". Try your function
with a few different numbers, including 0 and a negative number, to make sure it always
gives the right answer.
Concepts: functions, if-else, % (modulo) operator
*/
function oddEvenChecker(number) {
  if (number < 1) {
    return "Number should be greater than 1";
  } else if (number % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}

console.log(oddEvenChecker(2));

/* 
Greeting Generator
Write a function that takes two inputs: a person's name and their age. Inside the function,
use a template literal (a string written with backticks and ${ }) to build and return a sentence
such as "Hello, Riya! You are 21 years old." Make sure the name and age you pass in always
show up correctly inside the sentence.
Concepts: functions, template literals
*/
function greetGenerator(name, age) {
  return `Hello, ${name}! You are ${age} years old.`;
}
console.log(greetGenerator("Sandesh", 26));

/* 
Rectangle Area Calculator
Write a function that takes the width and height of a rectangle as two separate inputs. Inside
the function, multiply the two numbers together to get the area, and return that result. Test
the function with a few different width and height values to confirm the area comes out
correct.
Concepts: functions, parameters, return values
*/
function areaOfRectangle(width, height) {
  return width * height;
}
console.log(areaOfRectangle(15, 8));

/* 
Private Counter with Closures
Write an outer function that has one variable inside it to keep track of a count, starting at 0.
This outer function should return another (inner) function that, every time it is called,
increases the count by 1 and returns the new value. The important part is that the count

variable should not be reachable or changeable from outside - the only way to change it
should be by calling the function that was returned.
Concepts: closures, private variables
*/
function counterWithClosures() {
  let count = 0;
  function inner() {
    count++;
    return count;
  }
  return inner;
}

let counter = counterWithClosures();
console.log(counter());
console.log(counter());
console.log(counter());

/*
Find the Largest Number
Write a function that takes an array of numbers and returns the largest number in it. You are
not allowed to use the built-in Math.max() method - instead, loop through the array yourself,
compare each number to the others, and keep track of the biggest one you have found so
far.
Concepts: arrays, loops, comparison logic
*/
function maxOfArray(numberArray) {
  let maximum = numberArray[0];
  for (let i = 1; i < numberArray.length; i++) {
    if (numberArray[i] >= maximum) {
      maximum = numberArray[i];
    }
  }
  return maximum;
}

console.log(maxOfArray([1, 3, 4, 2, 5, 7]));

/*
Product Data Processor
You will work with an array of product objects, where each object has a name, a price, and
a category. First, use the map() method to make a new array that only contains the product
names. Second, use the filter() method to make another array that only contains products
from one specific category. Third, use the reduce() method to add up the prices of every
product and return the total.
Concepts: map, filter, reduce
*/
const products = [
  { name: "iPhone", price: 80000, category: "Electronics" },
  { name: "Laptop", price: 60000, category: "Electronics" },
  { name: "T-Shirt", price: 1000, category: "Clothing" },
  { name: "Jeans", price: 2000, category: "Clothing" },
];

const productNames = products.map((product) => product.name);
const productCategory = products.filter(
  (product) => product.category === "Clothing",
);
const productPrice = products.reduce((val, product) => val + product.price, 0);

console.log(productNames);
console.log(productCategory);
console.log(productPrice);

/* 
Debounce Utility from Scratch
Write your own function called debounce that takes two inputs: another function (fn) and a
delay time in milliseconds. Your debounce function should return a new function that, every
time it is called, waits for the given delay before actually running fn. If it gets called again
before that delay finishes, it should cancel the earlier wait and start counting the delay again
from zero. This trick is useful for things like search boxes, where you don't want to run code
on every single keystroke.
Concepts: closures, setTimeout/clearTimeout, higher-order functions
*/
function debounce(fn, delay) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn();
    }, delay);
  };
}

/*
Sequential Task Runner
Write three separate functions, where each one waits for a short delay (you can use a
Promise with setTimeout inside it) and then logs a different message to the console, such
as "Step 1 done", "Step 2 done", and "Step 3 done". Then write one more function that uses
async/await to run all three, one after another, so Step 2 never starts before Step 1 has fully
finished, and Step 3 never starts before Step 2 has fully finished.
Concepts: async/await, promises, sequencing
*/
