// 1. Create a function named `greet` that prints `"Hello World"`.
function greet() {
  return "Hello World";
}
console.log(greet());

// 2. Create a function `add(a, b)` that returns the sum.
function add(a, b) {
  return a + b;
}
console.log(add(5, 3));

// 3. Write a function to calculate the square of a number.
function squareOfNumber(num) {
  return Math.pow(num, 2);
}
console.log(squareOfNumber(4));

// 4. Create a function that checks whether a number is even or odd.
function checkEvenOdd(num) {
  if (num <= 0) return null;
  if (num % 2 === 0) {
    return "Number is Even";
  } else {
    return "Number is Odd";
  }
}
console.log(checkEvenOdd(2));

// 5. Write a function that converts Celsius to Fahrenheit.
function celsiusToFahrenheitConverter(degree) {
  return degree * (9 / 5) + 32;
}
console.log(celsiusToFahrenheitConverter(35));

// 6. Create a function with default parameter `"Guest"`.
function defaultParam(person = "Guest") {
  return "Hello " + person;
}
console.log(defaultParam());

// 7. Write a function that returns the greater of two numbers.
function greatestOfTwo(a, b) {
  return a > b ? a : b;
}
console.log(greatestOfTwo(20, 25));

// 8. Create a function to calculate area of rectangle.
function areaOfRectangle(length, width) {
  return length * width;
}
console.log(areaOfRectangle(2.5, 2));

// 9. Write a function that returns `"Adult"` if age ≥ 18 else `"Minor"`.
function ageFunction(age) {
  if (age < 0) return "Invalid age";
  return age > 18 ? "Adult" : "Minor";
}
console.log(ageFunction(20));

// 10. Create a function to reverse a string.
function reverseString(str) {
  return str.split("").reverse().join("");
}
console.log(reverseString("Hello"));

// 11. Write a function expression for multiplication.
const multiplication = function (num1, num2) {
  return num1 * num2;
};
console.log(multiplication(5, 4));

// 12. Convert a normal function into an arrow function.
const addition = (a, b) => a + b;
console.log(add(2, 6));

// 13. Create a function that accepts unlimited numbers and returns their sum using rest operator.
function sumFunction(...numbers) {
  let total = 0;
  for (let n of numbers) total += n;
  return total;
}
console.log(sumFunction(1, 2, 3, 4, 5));

// 14. Write a function that counts vowels in a string.
const vowelCounter = (str) => {
  let vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  let count = 0;
  for (let s of str) {
    if (vowels.includes(s)) {
      count += 1;
    }
  }
  return count;
};
console.log(vowelCounter("Hello"));

// 15. Create a function that checks if a string is palindrome.
const palindromeCheck = function (str) {
  return str === str.split("").reverse().join("");
};
console.log(palindromeCheck("sasas"));

// 16. Write a callback function example using `setTimeout`.
setTimeout(function () {
  console.log("2 Seconds passed");
}, 2000);

// 17. Create a higher-order function that executes another function twice.
// 18. Write a function that returns another function.
// 19. Create a pure function for subtraction.
// 20. Create an impure function using global variable modification.