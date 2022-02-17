
const displayElement = document.querySelector('#display');
const resultElement = document.querySelector('#result');
const clearElement = document.querySelector('#clear');


const numberElements = document.querySelectorAll('.js-number');
const operatorElements = document.querySelectorAll('.js-operator');


let isInsertNumber = true; 
let isResult = false; 
let currentNumber = '0'; 
let currentOperator = ''; 
let numbers = []; 
let operators = []; 

// 計算窓に表示する
const showDisplay = () => {
  if (isInsertNumber) {
    const text = String(currentNumber);
    const newText = text.replace(/^0{1,}([^.])/, '$1');
    displayElement.value = newText;
  } else {
    displayElement.value = total();
  }
};

// 演算子の計算する
const calculate = (prev, current, index) => {
  switch (operators[index]) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '*':
      return prev * current;
    case '/':
      return prev / current;
    default:
      console.log(`${operator} is not working...`);
  }
};


const total = () => {
  return numbers.reduce((prev, current, index) => {
    return calculate(prev, current, index - 1);
  });
};



const selectNumber = num => {
 
  if (isResult) {
    currentNumber = '0';
    isResult = false;
  }

 
  if (!isInsertNumber) {
    operators.push(currentOperator);
    currentNumber = '0';
    isInsertNumber = true;
  }


  if (num === '.' && currentNumber.includes('.')) {
    return;
  }

  currentNumber += num;
};


numberElements.forEach(numberElement => {
  numberElement.addEventListener('click', event => {
    selectNumber(event.target.value);
    showDisplay();
  });
});



const selectOparator = op => {
  if (isInsertNumber) {
    numbers.push(Number(currentNumber));
    isInsertNumber = false;
  }

  currentOperator = op;
};


operatorElements.forEach(operatorElement => {
  operatorElement.addEventListener('click', event => {
    selectOparator(event.target.value);
    showDisplay();
  });
});



const showResult = () => {
  if (isInsertNumber && currentOperator && !isResult) {
    numbers.push(Number(currentNumber));
    currentOperator = '';
    currentNumber = total();
    numbers = [];
    operators = [];
    isResult = true;
  }
};


resultElement.addEventListener('click', () => {
  showResult();
  showDisplay();
});



const clear = () => {
  numbers = [];
  operators = [];
  currentNumber = 0;
  currentOperator = '';
  isInsertNumber = true;
};

  
clearElement.addEventListener('click', () => {
  clear();
  showDisplay();
});