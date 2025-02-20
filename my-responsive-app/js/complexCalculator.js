// This file contains the logic for the complexCalculator tab. 
// It handles advanced calculations and updates the display of results.

document.addEventListener('DOMContentLoaded', function() {
    const complexCalcForm = document.getElementById('complexCalcForm');
    const complexCalcResult = document.getElementById('complexCalcResult');

    complexCalcForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const expression = document.getElementById('complexCalcInput').value;
        try {
            const result = eval(expression); // Caution: eval can be dangerous if not controlled
            complexCalcResult.textContent = `Result: ${result}`;
        } catch (error) {
            complexCalcResult.textContent = 'Error: Invalid expression';
        }
    });
});