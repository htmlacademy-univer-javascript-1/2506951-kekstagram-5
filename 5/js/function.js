function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

function isPalindrome(str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = normalizedStr.split('').reverse().join('');
  return normalizedStr === reversedStr;
}

// Пример вызова функции checkStringLength
const string1 = 'Привет, мир!';
checkStringLength(string1, 12);


// Пример вызова функции isPalindrome
const string2 = 'А роза упала на лапу Азора';
isPalindrome(string2);
