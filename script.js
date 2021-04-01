/** @format */

const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equal = document.getElementById('equal-button');
const clear = document.getElementById('clear-button');

let displayAbove = document.getElementById('display-above');
let displayBelow = document.getElementById('input-below');

let firstNumber = '';
let secondNumber = '';
let operator = '';

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  displayAbove.textContent = '';
  displayBelow.value = '';
}

function binaryOperation(strFirst, strSecond, operator) {
  let result = '';
  let floatFirst = parseFloat(strFirst);
  let floatSecond = parseFloat(strSecond);
  switch (operator) {
    case '+':
      result = floatFirst + floatSecond;
      break;
    case '-':
      result = floatFirst - floatSecond;
      break;
    case '*':
      result = floatFirst * floatSecond;
      break;
    case '/':
      result = floatFirst / floatSecond;
      break;
  }
  return result;
}

clearAll();

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', (event) => {
    // if (
    //   (event.target.textContent === '.' && firstNumber.indexOf('.') > -1) ||
    //   (event.target.textContent === '.' && secondNumber.indexOf('.') > -1)
    if (event.target.textContent !== '.' || firstNumber.indexOf('.') === -1) {
      if (
        (!displayAbove.textContent && !secondNumber) ||
        (firstNumber && operator === '=')
      ) {
        // fistNumber에 저장하는 경우 : 최초 입력 or =을 입력하여 계산한 후
        firstNumber += event.target.textContent;
        console.log('[no1]firstNumber', firstNumber);
        console.log("firstNumber.indexOf('.')", firstNumber.indexOf('.'));
        displayBelow.value = firstNumber;
      }
    }
    if (event.target.textContent !== '.' || secondNumber.indexOf('.') === -1) {
      if (firstNumber && operator) {
        // secondNumber에 저장하는 경우 : firstNumber&operator 입력 후 or 연산자를 입력하여 계산한 후
        secondNumber += event.target.textContent;
        console.log('[no2]secondNumber', secondNumber);
        console.log("secondNumber.indexOf('.')", secondNumber.indexOf('.'));
        displayBelow.value = secondNumber;
      }
    }
  });
}

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', (event) => {
    if (firstNumber && !secondNumber) {
      operator = event.target.textContent;
      console.log('[op1]operator', operator);
      displayAbove.textContent = `${firstNumber} ${operator}`;
      console.log('[op1]displayAbove.textContent', displayAbove.textContent);
    } else if (firstNumber && secondNumber) {
      displayAbove.textContent = `${firstNumber} ${operator} ${secondNumber}`;
      firstNumber = binaryOperation(firstNumber, secondNumber, operator);
      displayBelow.value = firstNumber;
      console.log('[op2]firstNumber', firstNumber);
      secondNumber = '';
      operator = event.target.textContent;
    }
  });
}

equal.addEventListener('click', (event) => {
  if (firstNumber && secondNumber) {
    displayAbove.textContent = `${firstNumber} ${operator} ${secondNumber}`;
    firstNumber = binaryOperation(firstNumber, secondNumber, operator);
    displayBelow.value = firstNumber;
    secondNumber = '';
    operator = event.target.textContent;
  }
});

clear.addEventListener('click', () => {
  clearAll();
});
