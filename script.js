const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const dot = document.getElementById('dot-button');
const equal = document.getElementById('equal-button');
const firstDisplay = document.getElementById('display1');
const secondDisplay = document.getElementById('display2');
const clear = document.getElementById('clear-button');

let allOfInputValue = '';
let displayedValue = '';
let lastChar = '';
let lastOperator = '';

function isOperator(char) {
  switch (char) {
    case '/':
      return true;
      break;
    case '*':
      return true;
      break;
    case '-':
      return true;
      break;
    case '+':
      return true;
      break;

    default:
      return false;
  }
}

function calculate(expressionString) {
  let arrayOfNumbers = [];
  let arrayOfOperators = [];

  arrayOfNumbers = expressionString.split(/\+|\-|\*|\//g);
  console.log('arrayOfNumbers', arrayOfNumbers);
  arrayOfOperators = expressionString.replace(/[0-9]|\./g, '').split('');
  console.log('arrayOfOperators', arrayOfOperators);

  let indexOfDivision = arrayOfOperators.indexOf('/');
  console.log('indexOfDivision', indexOfDivision);
  while (indexOfDivision != -1) {
    arrayOfNumbers.splice(
      indexOfDivision,
      2,
      arrayOfNumbers[indexOfDivision] / arrayOfNumbers[indexOfDivision + 1]
    );
    console.log('arrayOfNumbers', arrayOfNumbers);
    arrayOfOperators.splice(indexOfDivision, 1);
    indexOfDivision = arrayOfOperators.indexOf('/');
    console.log('indexOfDivision', indexOfDivision);
  }

  let indexOfTimes = arrayOfOperators.indexOf('*');
  console.log('indexOfTimes', indexOfTimes);
  while (indexOfTimes != -1) {
    arrayOfNumbers.splice(
      indexOfTimes,
      2,
      arrayOfNumbers[indexOfTimes] * arrayOfNumbers[indexOfTimes + 1]
    );
    console.log('arrayOfNumbers', arrayOfNumbers);
    arrayOfOperators.splice(indexOfTimes, 1);
    indexOfTimes = arrayOfOperators.indexOf('*');
  }

  let indexOfMinus = arrayOfOperators.indexOf('-');
  console.log('indexOfMinus', indexOfMinus);
  while (indexOfMinus != -1) {
    arrayOfNumbers.splice(
      indexOfMinus,
      2,
      arrayOfNumbers[indexOfMinus] - arrayOfNumbers[indexOfMinus + 1]
    );
    console.log('arrayOfNumbers', arrayOfNumbers);
    arrayOfOperators.splice(indexOfMinus, 1);
    indexOfMinus = arrayOfOperators.indexOf('-');
  }

  let indexOfPlus = arrayOfOperators.indexOf('+');
  console.log('indexOfPlus', indexOfPlus);
  while (indexOfPlus != -1) {
    arrayOfNumbers.splice(
      indexOfPlus,
      2,
      parseFloat(arrayOfNumbers[indexOfPlus]) +
        parseFloat(arrayOfNumbers[indexOfPlus + 1])
      // 2+5 = 25(x)
    );
    console.log('arrayOfNumbers', arrayOfNumbers);
    arrayOfOperators.splice(indexOfPlus, 1);
    indexOfPlus = arrayOfOperators.indexOf('+');
  }

  return arrayOfNumbers[0];
}

secondDisplay.value = '0';

//  새로운 입력값이 숫자인 경우
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', (event) => {
    if (!isNaN(lastChar) || lastChar === '.' || !lastChar) {
      // 마값이 숫자 or . or '' 이면,
      allOfInputValue += event.target.textContent;
      lastChar = allOfInputValue[allOfInputValue.length - 1];
      firstDisplay.textContent = allOfInputValue;

      if (lastOperator === '=') {
        displayedValue = event.target.textContent;
        console.log('1displayedValue', displayedValue);
        secondDisplay.value = displayedValue;
        console.log('1secondDisplay.value', secondDisplay.value);
        lastOperator = ''; // 초기화 안하면 lastOperator에 '='가 계속 남아서 displayedValue가 replace됨
      } else {
        displayedValue += event.target.textContent;
        console.log('2displayedValue', displayedValue);

        secondDisplay.value = displayedValue;
        console.log('2secondDisplay.value', secondDisplay.value);
      }
    } else if (isOperator(lastChar)) {
      console.log('3lastChar', lastChar);
      lastOperator = lastChar;
      allOfInputValue += event.target.textContent;
      lastChar = allOfInputValue[allOfInputValue.length - 1];
      firstDisplay.textContent = allOfInputValue;
      displayedValue = event.target.textContent;
      secondDisplay.value = displayedValue;
    }
    console.log('4secondDisplay.value', secondDisplay.value);
    console.log('4lastChar', lastChar);
    console.log('lastOperator', lastOperator);
    console.log('allOfInputValue', allOfInputValue);
    console.log('4displayedValue', displayedValue);
    console.log('-----------------------------------------');
  });
}

//  새로운 입력값이 점인 경우
dot.addEventListener('click', (event) => {
  if ((!isNaN(lastChar) || !lastChar) && displayedValue.indexOf('.') < 0) {
    allOfInputValue += event.target.textContent;
    lastChar = allOfInputValue[allOfInputValue.length - 1];
    firstDisplay.textContent = allOfInputValue;
    if (lastOperator === '=') {
      displayedValue = event.target.textContent;
      secondDisplay.value = displayedValue;
    } else {
      displayedValue += event.target.textContent;
      secondDisplay.value = displayedValue;
    }
  }
  console.log('lastChar', lastChar);
  console.log('lastOperator', lastOperator);
  console.log('allOfInputValue', allOfInputValue);
  console.log('displayedValue', displayedValue);
  console.log('-----------------------------------------');
});

//  새로운 입력값이 연산자인 경우
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', (event) => {
    if (!isNaN(lastChar)) {
      if (isOperator(lastOperator)) {
        displayedValue = calculate(allOfInputValue);
        secondDisplay.value = displayedValue;
        lastOperator = event.target.textContent;
      }
      allOfInputValue += event.target.textContent;
      lastChar = allOfInputValue[allOfInputValue.length - 1];
      firstDisplay.textContent = allOfInputValue;
    }
    console.log('lastChar', lastChar);
    console.log('lastOperator', lastOperator);
    console.log('allOfInputValue', allOfInputValue);
    console.log('displayedValue', displayedValue);
    console.log('-----------------------------------------');
  });
}

//  새로운 입력값이 이퀄인 경우
equal.addEventListener('click', (event) => {
  if (!isNaN(lastChar) && lastOperator) {
    displayedValue = calculate(allOfInputValue);
    secondDisplay.value = displayedValue;
    lastOperator = event.target.textContent;
    allOfInputValue = '';

    lastChar = '';
  }
  console.log('lastChar', lastChar);
  console.log('lastOperator', lastOperator);
  console.log('allOfInputValue', allOfInputValue);
  console.log('displayedValue', displayedValue);
  console.log('-----------------------------------------');
});

clear.addEventListener('click', (event) => {
  allOfInputValue = '';
  lastChar = '';
  displayedValue = '';
  firstDisplay.textContent = '';
  secondDisplay.value = '0';
  lastOperator = '';
  console.log('lastChar', lastChar);
  console.log('lastOperator', lastOperator);
  console.log('allOfInputValue', allOfInputValue);
  console.log('displayedValue', displayedValue);
  console.log('-----------------------------------------');
});
