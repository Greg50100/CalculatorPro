// calculator.js

console.log('calculator.js chargé');

(function() {
    const display = document.getElementById('calculator-display');
    const buttons = document.querySelectorAll('.calculator-button');

    if (!display || buttons.length === 0) {
        console.error('Éléments de la calculatrice non trouvés.');
        return;
    }

    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;
            if (value === 'C') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.textContent = '0';
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput === '') return;
                if (previousInput !== '') {
                    calculate();
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            } else if (value === '=') {
                calculate();
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    const calculate = () => {
        if (currentInput === '' || operator === '' || previousInput === '') return;
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        if (isNaN(num1) || isNaN(num2)) return;
        let result;
        switch (operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/':
                if (num2 === 0) {
                    display.textContent = 'Erreur : Division par zéro';
                    currentInput = '';
                    operator = '';
                    previousInput = '';
                    return;
                }
                result = num1 / num2;
                break;
            default: return;
        }
        currentInput = result.toString();
        previousInput = '';
        operator = '';
        display.textContent = currentInput;
    };
})();
