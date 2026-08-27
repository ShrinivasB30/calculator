const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleInput(value);
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    handleInput(key);
  } else if (key === 'Enter') {
    handleInput('=');
  } else if (key === 'Backspace') {
    handleInput('⌫');
  } else if (key === 'Escape') {
    handleInput('C');
  }
});

function handleInput(value) {
  if (value === 'C') {
    expression = '';
  } else if (value === '⌫') {
    expression = expression.slice(0, -1);
  } else if (value === '=') {
    expression = calculate(expression);
  } else if (value === '%') {
    expression = calculate(expression) + '/100';
  } else {
    expression += value;
  }
  display.value = expression;
}

function calculate(expr) {
  try {
    // Only allow safe characters: digits, operators, decimal point, parentheses
    if (!/^[0-9+\-*/.() ]*$/.test(expr)) {
      return 'Error';
    }
    // eslint-disable-next-line no-eval
    const result = Function('"use strict"; return (' + expr + ')')();
    if (result === undefined || Number.isNaN(result) || !isFinite(result)) {
      return 'Error';
    }
    return String(result);
  } catch (e) {
    return 'Error';
  }
}
