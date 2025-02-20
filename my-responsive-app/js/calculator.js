// This file contains the logic for the "calculator" tab. It handles basic arithmetic operations and updates the display of results.

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('calculator-display');
    const buttons = document.querySelectorAll('.calculator-button');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.innerText;

            if (value === 'C') {
                clear();
            } else if (value === '=') {
                calculate();
            } else if (['+', '-', '*', '/'].includes(value)) {
                setOperator(value);
            } else {
                appendToInput(value);
            }
        });
    });

    function appendToInput(value) {
        currentInput += value;
        display.innerText = currentInput;
    }

    function setOperator(value) {
        if (currentInput === '') return;
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else {
            calculate();
        }
        operator = value;
        currentInput = '';
    }

    function calculate() {
        if (firstOperand === null || currentInput === '') return;
        const secondOperand = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }

        display.innerText = result;
        currentInput = '';
        firstOperand = result;
        operator = '';
    }

    function clear() {
        currentInput = '';
        firstOperand = null;
        operator = '';
        display.innerText = '0';
    }
});