// js/complexCalculator.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('complexCalculator.js chargé');
    const subTabs = document.querySelectorAll('.sub-tab');
    const calcContents = document.querySelectorAll('.calc-content');

    subTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            // Réinitialisation des classes actives
            calcContents.forEach(content => content.classList.remove('active'));
            subTabs.forEach(t => t.classList.remove('active'));
            // Activation de l’onglet et contenu ciblé si présent
            const targetEl = document.getElementById(target);
            if (targetEl) {
                targetEl.classList.add('active');
                tab.classList.add('active');
            } else {
                console.error(`Élément avec l'ID ${target} non trouvé`);
            }
        });
    });

    // Calculs Psychrométriques
    const psychrometricForm = document.getElementById('psychrometricForm');
    console.log('psychrometricForm:', psychrometricForm);
    if (psychrometricForm) {
        psychrometricForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const dryBulbTemp = parseFloat(document.getElementById('dryBulbTemp').value);
            const relativeHumidity = parseFloat(document.getElementById('relativeHumidity').value);
            const saturationPressure = 6.1078 * Math.exp((17.27 * dryBulbTemp) / (237.3 + dryBulbTemp));
            const actualVaporPressure = (relativeHumidity / 100) * saturationPressure;
            const humidityRatio = 0.622 * (actualVaporPressure / (1013 - actualVaporPressure));
            document.getElementById('psychrometricResult').innerHTML = `
                <h4>Résultats :</h4>
                <ul>
                    <li>Humidité Absolue : ${humidityRatio.toFixed(5)} kg vapeur/kg air sec</li>
                </ul>
            `;
        });
    }

    // Calculs Électriques
    const electricalForm = document.getElementById('electricalForm');
    console.log('electricalForm:', electricalForm);
    if (electricalForm) {
        electricalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let voltage = parseFloat(document.getElementById('voltage').value);
            let current = parseFloat(document.getElementById('current').value);
            let resistance = parseFloat(document.getElementById('resistance').value);
            let power = parseFloat(document.getElementById('power').value);
            const filledFields = [voltage, current, resistance, power].filter(val => !isNaN(val));
            if (filledFields.length < 2) {
                document.getElementById('electricalResult').innerHTML = '<p style="color:red;">Veuillez remplir au moins deux valeurs.</p>';
                return;
            }
            const calculateVoltage = () => (!isNaN(current) && !isNaN(resistance)) ? current * resistance 
                                    : (!isNaN(power) && !isNaN(current)) ? power / current 
                                    : (!isNaN(power) && !isNaN(resistance)) ? Math.sqrt(power * resistance) 
                                    : NaN;
            const calculateCurrent = () => (!isNaN(voltage) && !isNaN(resistance)) ? voltage / resistance 
                                    : (!isNaN(power) && !isNaN(voltage)) ? power / voltage 
                                    : (!isNaN(power) && !isNaN(resistance)) ? Math.sqrt(power / resistance) 
                                    : NaN;
            const calculateResistance = () => (!isNaN(voltage) && !isNaN(current)) ? voltage / current 
                                    : (!isNaN(voltage) && !isNaN(power)) ? Math.pow(voltage, 2) / power 
                                    : (!isNaN(power) && !isNaN(current)) ? power / Math.pow(current, 2)
                                    : NaN;
            const calculatePower = () => (!isNaN(voltage) && !isNaN(current)) ? voltage * current 
                                    : (!isNaN(voltage) && !isNaN(resistance)) ? Math.pow(voltage, 2) / resistance 
                                    : (!isNaN(resistance) && !isNaN(current)) ? Math.pow(current, 2) * resistance
                                    : NaN;
            voltage = isNaN(voltage) ? calculateVoltage() : voltage;
            current = isNaN(current) ? calculateCurrent() : current;
            resistance = isNaN(resistance) ? calculateResistance() : resistance;
            power = isNaN(power) ? calculatePower() : power;
            document.getElementById('electricalResult').innerHTML = `
                <h4>Résultats :</h4>
                <ul>
                    <li>Tension (V) : ${voltage.toFixed(2)} V</li>
                    <li>Courant (A) : ${current.toFixed(2)} A</li>
                    <li>Résistance (Ω) : ${resistance.toFixed(2)} Ω</li>
                    <li>Puissance (W) : ${power.toFixed(2)} W</li>
                </ul>
            `;
        });
    }

    // Calculs Astronomiques
    const astronomicalForm = document.getElementById('astronomicalForm');
    console.log('astronomicalForm:', astronomicalForm);
    if (astronomicalForm) {
        astronomicalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = new Date(document.getElementById('date').value);
            const latitude = parseFloat(document.getElementById('latitude').value);
            const longitude = parseFloat(document.getElementById('longitude').value);
            if (isNaN(date.getTime()) || isNaN(latitude) || isNaN(longitude)) {
                document.getElementById('astronomicalResult').innerHTML = '<p style="color:red;">Données invalides.</p>';
                return;
            }
            // Utilisation de SunCalc pour les calculs astronomiques
            const times = SunCalc.getTimes(date, latitude, longitude);
            const sunrise = times.sunrise.toLocaleTimeString();
            const sunset = times.sunset.toLocaleTimeString();
            document.getElementById('astronomicalResult').innerHTML = `
                <h4>Résultats :</h4>
                <ul>
                    <li>Lever du soleil : ${sunrise}</li>
                    <li>Coucher du soleil : ${sunset}</li>
                </ul>
            `;
        });
    }

    // Chargement de SunCalc : vérifier qu'il n'est pas déjà présent
    if (!window.SunCalc) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/suncalc/1.8.0/suncalc.min.js';
        document.head.appendChild(script);
    }

    console.log("complexCalculator.js : fonctions refactorisées pour une meilleure maintenabilité.");
});
