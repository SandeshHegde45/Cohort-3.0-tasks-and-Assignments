// Question 1: Print "Hello JavaScript" in the console.
console.log("Hello World");

// Question 2: Print your name, age, and city using one console.log().
console.log("Name: Sandesh Hegde, Age: 26, City: Sirsi");

// 3. Print a warning message using `console.warn()`.
console.warn("This is a warning message!");

// 4. Print an error message using `console.error()`.
console.error("This is an error message!");

// 5. Use `console.table()` to display an array of 5 numbers.
console.log("Array of numbers:");
console.table([1, 2, 3, 4, 5]);

// 6. Create a variable called studentName and store your name in it.
let studentName = "Sandesh Hegde";
console.log("Student Name:", studentName);

// 7. Create a variable called age and print it.
let age = 26;
console.log("Age:", age);

// 8. Create two variables and swap their values.
let a = 5;
let b = 10;
console.log("Before swapping: a =", a, ", b =", b);
let temp = a;
a = b;
b = temp;
console.log("After swapping: a =", a, ", b =", b);

// 9. Create a constant called PI and print its value.
const PI = 3.14159;
console.log("Value of PI:", PI);

// 10. Declare a variable without assigning a value and print it.
let studentCity;
console.log("Student City:", studentCity);

// 11. Create a variable score and increase it by 10.
let score = 50;
score += 10;
console.log("Updated Score:", score);

// 12. Create three variables for first name, last name, and full name.
let firstName = "Sandesh";
let lastName = "Hegde";
let fullName = firstName + " " + lastName;
console.log("Full Name:", fullName);

// 13. Create variables of type string, number, boolean, null, and undefined.
let myString = "Hello";
let myNumber = 42;
let myBoolean = true;
let myNull = null;
let myUndefined;
console.log("String:", myString);
console.log("Number:", myNumber);
console.log("Boolean:", myBoolean);
console.log("Null:", myNull);
console.log("Undefined:", myUndefined);

// 14. Check the type of different variables using typeof.
console.log("Type of myString:", typeof myString);
console.log("Type of myNumber:", typeof myNumber);
console.log("Type of myBoolean:", typeof myBoolean);
console.log("Type of myNull:", typeof myNull);
console.log("Type of myUndefined:", typeof myUndefined);

// 15. Store your mobile number in a variable and check its type.
let mobileNumber = "1234567890";
console.log("Type of mobileNumber:", typeof mobileNumber);

// 16. Create a variable with value null and check its type.
let myNullValue = null;
console.log("Type of myNullValue:", typeof myNullValue);

// 17. Create a bigint number and print it.
let bigIntNumber = 123456789012345678901234567890n;
console.log("BigInt Number:", bigIntNumber);

// 18. Convert the string "50" into a number.
let aString = "50";
console.log(Number(aString));

// 19. Convert the number 100 into a string.
let aNumber = 100;
console.log(String(aNumber));

// 20. Convert "true" into a boolean.
let aBoolean = "true";
console.log(Boolean(aBoolean));

// 21. Check the output of: "5"+2, "5"-2, true + 1
console.log("5" + 2);
console.log("5" - 2);
console.log(true + 1);

// 22. Create a variable with value "123abc" and convert it into a number.
let alphanumber = "123abc";
console.log(parseInt(alphanumber));

// 23. Use parseInt() on "500px".
console.log(parseInt("500px"));

// 24. Add two numbers and print the result.
console.log(5 + 10);

// 25. Find the remainder when 25 is divided by 4.
console.log(25 % 4);

// 26. Find the square of a number using exponent operator.
console.log(5 ** 2);

// 27. Increment a variable using ++.
let incrementVariable = 10;
console.log(incrementVariable++);

// 28. Decrement a variable using `-`.
let decrementVariable = 5;
console.log(decrementVariable--);

// 29. Use `+=` operator to increase a variable by 20.
let op1 = 10;
console.log((op1 += 20));

// 30. Compare two numbers using `>`, `<`, `>=`, `<=`.
let compareNo1 = 11;
let compareNo2 = 20;
console.log(compareNo1 > compareNo2);
console.log(compareNo1 < compareNo2);
console.log(compareNo1 >= compareNo2);
console.log(compareNo1 <= compareNo2);

// 31. Check if two values are strictly equal using `===`.
console.log(compareNo1 === compareNo2);

// 32. Compare "10" and 10 using both `==` and `===`.
console.log("10" == 10);
console.log("10" === 10);

// 33. Create two boolean variables and test `&&`, `||`, and `!`.
let firstBoolean = true;
let secondBoolean = false;
console.log(firstBoolean && secondBoolean);
console.log(firstBoolean || secondBoolean);
console.log(!secondBoolean);

// 34. Create a string and print its length.
let lenghtString = "Hello World!";
console.log(lenghtString.length);

// 35. Convert a string into uppercase.
let upperString = "good evening";
console.log(upperString.toUpperCase());

// 36. Convert a string into lowercase.
let lowerString = "Good Morning";
console.log(lowerString.toLowerCase());

// 37. Check if a string includes the word `"JavaScript"`.
let stringIncludes = "I am learning JavaScript";
console.log(stringIncludes.includes("JavaScript"));

// 38. Extract the word `"World"` from `"Hello World"`.
let extractString = "Hello World";
console.log(extractString.substring(6, 11));

// 39. Replace `"apple"` with `"mango"` in a sentence.
let sentence = "I like apple pie";
console.log(sentence.replace("apple", "mango"));

// 40. Split `"HTML,CSS,JS"` into an array.
let splitString = "HTML,CSS,JS";
console.log(splitString.split(","));

// 41. Remove extra spaces from a string.
let trimableString = " I am fine ";
console.log(trimableString.trim());
// 42. Repeat the word `"Hi"` 5 times.
let hiVariable = "Hi";
console.log(hiVariable.repeat(5));

// 43. Print the first character of a string.
let firstCharString = "Hello";
console.log(firstCharString.charAt(0));

// 44. Use template literals to print:`"My name is Aman and I am 20 years old"`
let name = "Aman";
let amanAge = 20;
console.log(`My name is ${name} and I am ${amanAge} years old`);

// 45. Round `4.7` using `Math.round()`.
let roundVar = 4.7;
console.log(Math.round(roundVar));

// 46. Find the square root of 81.
console.log(Math.sqrt(81));

// 47. Find the maximum number from `10, 20, 5, 99`.
console.log(Math.max(10, 20, 5, 99));

// 48. Generate a random number between 1 and 10.
console.log(Math.round(Math.random() * 10) + 1);

// 49. Convert `"99.99"` into an integer.
console.log(Math.floor(99.99))

// 50. Check whether `25` is an integer or not.
console.log(Number.isInteger(25));

// 51. Use `toFixed(2)` on `3.141592`.
let Pi = 3.141592;
console.log(PI.toFixed(2));

// 52. Check whether a number is positive or negative.
let numberToCheck = -5;
if (numberToCheck > 0) {
  console.log("The number is positive.");
} else if (numberToCheck < 0) {
  console.log("The number is negative.");
} else {
  console.log("The number is zero.");
}

// 53. Check whether a number is even or odd.
let evenOdd = 21
if (evenOdd % 2 === 0) {
  console.log("Number is even");
} else {
  console.log("Number is odd");
}

// 54. Check whether a person is eligible to vote.
let personAge = 18;
if (personAge >= 18) {
  console.log("He should vote.");
} else {
  console.log("He is not eligible to vote.");
}

// 55. Find the largest among two numbers.
let largestNumber1 = 12;
let largestNumber2 = 15;
if (largestNumber1 >= largestNumber2) {
  console.log("Largest number is 1st one");
} else {
  console.log("Largest number is 2nd one");
}

// 56. Find the largest among three numbers.
let largestNumber01 = 12;
let largestNumber02 = 15;
let largestNumber03 = 16;
if (largestNumber01 >= largestNumber02 && largestNumber01 >= largestNumber03) {
  console.log("Largest number is 1st one");
} else if (largestNumber02 >= largestNumber01 && largestNumber02 >= largestNumber03) {
  console.log("Largest number is 2nd one");
} else {
  console.log("Largest number is 3rd one");
}

// 57. Check whether a year is a leap year.
let checkLeapYear = 400;
if ((checkLeapYear % 4 === 0 && checkLeapYear % 100 != 0) || (checkLeapYear % 400 === 0)) {
  console.log("Year is leap");
} else {
  console.log("Not a leap year");
}

// 58. Check whether a number is divisible by both 3 and 5.
let divideBythreeAndFive = 15;
if (divideBythreeAndFive % 3 === 0 && divideBythreeAndFive % 5 === 0) {
  console.log("Number is divided by 3 and 5");
} else {
  console.log("Number is not divided by 3 and 5");
}

/* 59. Create a simple grading system:
  90+ → A
  75+ → B
  50+ → C
  below 50 → Fail */

// 60. Check whether a character is a vowel or consonant.

// 61. Create a calculator using switch statement.

// 62. Print the day name based on a number (1–7).

// 63. Check whether a username is "admin" and password is "1234"