function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

function isPalindrome(str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = normalizedStr.split('').reverse().join('');
  return normalizedStr === reversedStr;
}

/*function printResult(message, result) {
  console.log(`${message}: ${result}`);
}

// Проверка длины строки
let result1 = checkStringLength('проверяемая строка', 20); // true
let result2 = checkStringLength('проверяемая строка', 18); // true
let result3 = checkStringLength('проверяемая строка', 10); // false

// Вывод результатов
printResult('Строка короче 20 символов', result1);
printResult('Длина строки ровно 18 символов', result2);
printResult('Строка длиннее 10 символов', result3);

// Проверка палиндромов
let palindromeResult1 = isPalindrome('топот'); // true
let palindromeResult2 = isPalindrome('ДовОд'); // true
let palindromeResult3 = isPalindrome('Кекс');  // false
let palindromeResult4 = isPalindrome('Лёша на полке клопа нашёл'); // true

// Вывод результатов
printResult('Строка "топот" является палиндромом', palindromeResult1);
printResult('Строка "ДовОд" является палиндромом', palindromeResult2);
printResult('Строка "Кекс" является палиндромом', palindromeResult3);
printResult('Строка "Лёша на полке клопа нашёл" является палиндромом', palindromeResult4);*/
