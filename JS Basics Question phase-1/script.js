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
console.log(Math.floor(99.99));

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
let evenOdd = 21;
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
} else if (
  largestNumber02 >= largestNumber01 &&
  largestNumber02 >= largestNumber03
) {
  console.log("Largest number is 2nd one");
} else {
  console.log("Largest number is 3rd one");
}

// 57. Check whether a year is a leap year.
let checkLeapYear = 400;
if (
  (checkLeapYear % 4 === 0 && checkLeapYear % 100 != 0) ||
  checkLeapYear % 400 === 0
) {
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
let grade = 85;
if (grade >= 90) {
  console.log("Grade: A");
} else if (grade >= 75) {
  console.log("Grade: B");
} else if (grade >= 50) {
  console.log("Grade: C");
} else {
  console.log("Grade: Fail");
}

// 60. Check whether a character is a vowel or consonant.
let character = "a";
if (
  character === "a" ||
  character === "e" ||
  character === "i" ||
  character === "o" ||
  character === "u"
) {
  console.log("Character is a vowel");
} else {
  console.log("Character is a consonant");
}

// 61. Create a calculator using switch statement.
let num1 = 10;
let num2 = 5;
let operator = "-";
switch (operator) {
  case "+":
    console.log(num1 + num2);
    break;
  case "-":
    console.log(num1 - num2);
    break;
  case "*":
    console.log(num1 * num2);
    break;
  case "/":
    console.log(num1 / num2);
    break;
  default:
    console.log("Invalid operator");
}

// 62. Print the day name based on a number (1–7).
let dayNumber = 3;
switch (dayNumber) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Invalid day number");
}

// 63. Check whether a username is "admin" and password is "1234"
let username = "admin";
let password = "1234";
if (username === "admin" && password === "1234") {
  console.log("Login successful.");
} else {
  console.log("Invalid username or password.");
}

// 64. Check whether an empty string is truthy or falsy.
let emptyString = "";
if (emptyString) {
  console.log("Empty string is truthy.");
} else {
  console.log("Empty string is falsy.");
}

// 65. Check whether `0` is truthy or falsy.
let zero = 0;
if (zero) {
  console.log("Zero is truthy.");
} else {
  console.log("Zero is falsy.");
}

// 66. Check whether `[]` is truthy or falsy.
let arrayVal = [];
if (arrayVal) {
  console.log("Empty array is truthy.");
} else {
  console.log("Empty array is falsy.");
}

// 67. Create a variable and print `"Valid"` if it has a value otherwise print `"Invalid"`.
let someVariable = "Hello";
if (someVariable) {
  console.log("Valid");
} else {
  console.log("Invalid");
}

// 68. Check whether a number is even or odd using ternary operator.
let evenOddTernary = 22;
let result = evenOddTernary % 2 === 0 ? "Even" : "Odd";
console.log(result);

// 69. Check whether age is above 18 using ternary operator.
let ageTernary = 20;
let eligibility =
  ageTernary >= 18 ? "Eligible to vote" : "Not eligible to vote";
console.log(eligibility);

// 70. Find the greater number between two values using ternary operator.
let number1 = 10;
let number2 = 20;
let greaterNumber = num1 > num2 ? num1 : num2;
console.log(greaterNumber);

// 71. Create a mini biodata program using variables and template literals.
let nameBio = "Sandesh Hegde";
let ageBio = 26;
let cityBio = "Sirsi";
console.log(`Name: ${nameBio}, Age: ${ageBio}, City: ${cityBio}`);

// 72. Calculate the area of a rectangle.
let length = 5;
let width = 3;
let area = length * width;
console.log("Area of the rectangle:", area);

// 73. Calculate the simple interest.
let principal = 1000;
let rate = 5;
let time = 2;
let simpleInterest = (principal * rate * time) / 100;
console.log("Simple Interest:", simpleInterest);

// 74. Convert temperature from Celsius to Fahrenheit.
let celsius = 25;
let fahrenheit = (celsius * 9) / 5 + 32;
console.log("Temperature in Fahrenheit:", fahrenheit);

// 75. Convert kilometers into meters.
let kilometers = 5;
let meters = kilometers * 1000;
console.log("Distance in meters:", meters);

// 76. Calculate total marks and percentage of 5 subjects.
let subject1 = 85;
let subject2 = 90;
let subject3 = 78;
let subject4 = 92;
let subject5 = 88;
let totalMarks = subject1 + subject2 + subject3 + subject4 + subject5;
let percentage = (totalMarks / 500) * 100;
console.log("Total Marks:", totalMarks);
console.log("Percentage:", percentage);

// 77. Calculate electricity bill based on units consumed.
let unitsConsumed = 150;
let billAmount = unitsConsumed * 10; // Assuming rate per unit is ₹10
console.log("Electricity Bill:", billAmount);

// 78. Create a username generator using first name and birth year.
let firstNameGen = "Sandesh";
let birthYear = 1999;
let usernameGen = firstNameGen.toLowerCase() + birthYear;
console.log("Generated Username:", usernameGen);

// 79. Check whether a string starts with a specific letter.
let stringToCheck = "Hello World";
let startsWithH = stringToCheck.startsWith("H");
console.log("Does the string start with 'H'? ", startsWithH);

// 80. Count the total characters in a sentence excluding spaces.
let sentenceToCount = "Hello World";
let characterCount = sentenceToCount.split(" ").join("").length;
console.log("Total characters excluding spaces:", characterCount);

// 81. Take two numbers and print which one is greater.
let numA = 15;
let numB = 25;
if (numA > numB) {
  console.log("Greater number is:", numA);
} else if (numB > numA) {
  console.log("Greater number is:", numB);
} else {
  console.log("Both numbers are equal.");
}

// 82. Check whether a number lies between 10 and 50.
let numberToCheckRange = 30;
if (numberToCheckRange > 10 && numberToCheckRange < 50) {
  console.log("Number lies between 10 and 50.");
} else {
  console.log("Number does not lie between 10 and 50.");
}

// 83. Check whether a password length is greater than 8.
let passwordToCheck = "mysecretpassword";
if (passwordToCheck.length > 8) {
  console.log("Password length is greater than 8");
} else {
  console.log("Password length should be greater than 8");
}

// 84. Check if a person can drive:
// - age > 18
// - has license = true
let ageOfPerson = 19;
let hasLicence = true;
if (ageOfPerson >= 18 && hasLicence) {
  console.log("Person is able to drive");
} else {
  console.log("Person is not able to drive");
}

// 85. Check whether a number is divisible by 2, 3, or both.
let numberBy2And3 = 30;
if (numberBy2And3 % 2 === 0 && numberBy2And3 % 3 === 0) {
  console.log("Number divided by both 2 and 3");
} else if (numberBy2And3 % 2 === 0) {
  console.log("Number divided by 2");
} else if (numberBy2And3 % 3 === 0) {
  console.log("Number divided by 3");
} else {
  console.log("Invalid Number");
}

// 86. Print `"Good Morning"`, `"Good Afternoon"`, or `"Good Evening"` based on time.
const timing = 8;
if (timing >= 5 && timing < 12) {
  console.log("Good Morning");
} else if (timing >= 12 && timing < 17) {
  console.log("Good Afternoon");
} else if (timing >= 17 && timing < 21) {
  console.log("Good Evening");
} else {
  console.log("Good Night");
}

// 87. Find whether a number is a multiple of 10.
const multipleOf10 = 52;
if (multipleOf10 % 10 === 0) {
  console.log("Number is a multiple of 10");
} else {
  console.log("Number is not a multiple of 10");
}

// 88. Create a simple discount calculator.
let originalPrice = 1000;
let discountPercentage = 20;
let discountAmount = (originalPrice * discountPercentage) / 100;
let finalPrice = originalPrice - discountAmount;
console.log("Final Price after discount:", finalPrice);

// 89. Check whether a product is in stock.
let productStock = 1;
if (productStock > 0) {
  console.log("Product is in stock");
} else {
  console.log("Product is out of stock");
}

// 90. Calculate final bill after GST.
let billAmountBeforeGST = 500;
let gstPercentage = 18;
let gstAmount = (billAmountBeforeGST * gstPercentage) / 100;
let finalBillAmount = billAmountBeforeGST + gstAmount;
console.log("Final Bill Amount after GST:", finalBillAmount);

// 91. Generate a random OTP of 4 digits.
let otp = Math.floor(Math.random() * 10000);
console.log("Generated OTP:", otp);

// 92. Reverse a 3-letter string manually.
let threeLetterString = "abc";
let reversedString = threeLetterString[2] + threeLetterString[1] + threeLetterString[0];
console.log("Reversed String:", reversedString);

// 93. Find the last character of a string.
let lastCharString = "Hello World";
console.log("Last character of the string:", lastCharString.charAt(lastCharString.length - 1));

// 94. Convert a full name into uppercase initials.
let fullNameToInitials = "Sandesh Hegde";
let initials = fullNameToInitials.split(" ");
let uppercaseInitials = initials[0].charAt(0).toUpperCase() + initials[1].charAt(0).toUpperCase();
console.log("Uppercase Initials:", uppercaseInitials);

// 95. Check whether two strings are equal ignoring case sensitivity.
let stringToCompare1 = "Hello";
let stringToCompare2 = "hello";
if (stringToCompare1.toLowerCase() === stringToCompare2.toLowerCase()) {
  console.log("Strings are equal (ignoring case)");
} else {
  console.log("Strings are not equal");
}

// 96. Create a simple login validation system.
let loginUsername = "admin";
let loginPassword = "1234";
if (loginUsername === "admin" && loginPassword === "1234") {
  console.log("Login successful.");
} else {
  console.log("Invalid username or password.");
}

// 97. Find whether a number is a 2-digit or 3-digit number.
let numberToCheckDigits = 123;
if (numberToCheckDigits >= 10 && numberToCheckDigits < 100) {
  console.log("Number is a 2-digit number");
} else if (numberToCheckDigits >= 100 && numberToCheckDigits < 1000) {
  console.log("Number is a 3-digit number");
} else {
  console.log("Number is neither 2-digit nor 3-digit");
}

// 98. Create a mini ATM balance checker.
let accountBalance = 5000;
let enteredPin = 1234;
if (enteredPin === 1234) {
  console.log("Your account balance is:", accountBalance);
} else {
  console.log("Invalid PIN");
}

// 99. Simulate a traffic light system using `switch`.
let trafficLightColor = "Green";
switch (trafficLightColor) {
  case "Red":
    console.log("Stop");
    break;
  case "Yellow":
    console.log("Prepare to stop");
    break;
  case "Green":
    console.log("Go");
    break;
  default:
    console.log("Invalid traffic light color");
}

// 100. Build a small marksheet generator using variables and conditionals.
let marksSubject1 = 85;
let marksSubject2 = 90;
let marksSubject3 = 78;
let totalMarks100 = marksSubject1 + marksSubject2 + marksSubject3;
let percentage100 = (totalMarks100 / 300) * 100;
let grade100;
if (percentage100 >= 80) {
  grade100 = "A";
} else if (percentage100 >= 60) {
  grade100 = "B";
} else {
  grade100 = "C";
}
console.log("Total Marks:", totalMarks100);
console.log("Percentage:", percentage100);
console.log("Grade:", grade100);
