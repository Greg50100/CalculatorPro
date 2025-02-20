// convertissor.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('convertissor.js chargé');

    const convertButton = document.getElementById('convertButton');
    const inputValue = document.getElementById('inputValue');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const resultDiv = document.getElementById('result');

    console.log('convertButton:', convertButton);
    console.log('inputValue:', inputValue);
    console.log('fromUnit:', fromUnit);
    console.log('toUnit:', toUnit);
    console.log('resultDiv:', resultDiv);
    
    if (!convertButton || !inputValue || !fromUnit || !toUnit || !resultDiv) {
        console.error('Éléments introuvables dans convertissor.js');
        return;
    }
    
    const conversionRates = {
        meters: 1,
        kilometers: 1000,
        miles: 1609.34,
        feet: 0.3048,
        inches: 0.0254,
        grams: 0.001,
        kilograms: 1,
        pounds: 0.453592,
        liters: 1,
        milliliters: 0.001,
        gallons: 3.78541,
    };

    convertButton.addEventListener('click', () => {
        const value = parseFloat(inputValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (isNaN(value)) {
            resultDiv.textContent = 'Veuillez entrer une valeur numérique.';
            return;
        }

        if (!conversionRates[from] || !conversionRates[to]) {
            resultDiv.textContent = 'Unité invalide';
            return;
        }

        const result = (value * conversionRates[from]) / conversionRates[to];
        resultDiv.textContent = `Résultat : ${result.toFixed(2)}`;
    });

    console.log('Événement click attaché au bouton convertButton');
});
