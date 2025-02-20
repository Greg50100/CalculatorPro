function convertUnits(value, fromUnit, toUnit) {
    const conversionRates = {
        meters: 1,
        kilometers: 0.001,
        miles: 0.000621371,
        feet: 3.28084,
        inches: 39.3701,
        grams: 1,
        kilograms: 0.001,
        pounds: 0.00220462,
        liters: 1,
        milliliters: 1000,
        gallons: 0.264172,
    };

    if (!conversionRates[fromUnit] || !conversionRates[toUnit]) {
        throw new Error('Invalid unit');
    }

    const valueInMeters = value / conversionRates[fromUnit];
    return valueInMeters * conversionRates[toUnit];
}

document.getElementById('convertButton').addEventListener('click', function() {
    const value = parseFloat(document.getElementById('inputValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    try {
        const result = convertUnits(value, fromUnit, toUnit);
        document.getElementById('result').textContent = `Result: ${result}`;
    } catch (error) {
        document.getElementById('result').textContent = error.message;
    }
});