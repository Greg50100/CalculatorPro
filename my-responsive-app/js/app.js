// Main application script to handle tab navigation, theme switching, and dynamically loading tab content

document.addEventListener('DOMContentLoaded', () => {
    console.log('app.js chargé');
    
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.body;

    // Fonction de chargement de contenu d'onglet
    const loadTabContent = async (tabId) => {
        try {
            const response = await fetch(`${tabId}.html`);
            if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
            const content = await response.text();
            const target = document.getElementById(tabId);
            if (target) {
                target.innerHTML = content;
                // Charger le script spécifique si nécessaire
                const script = document.createElement('script');
                script.src = `js/${tabId}.js`;
                document.body.appendChild(script);
            } else {
                console.error(`Onglet ${tabId} introuvable.`);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du contenu :', error);
            const target = document.getElementById(tabId);
            if (target) {
                target.innerHTML = `<p style="color:red;">Échec du chargement du contenu : ${error.message}</p>`;
            }
        }
    };

    // Fonction de commutation d'onglets
    const switchTab = (event) => {
        // Réinitialiser les onglets et contenus
        tabContents.forEach(content => content.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));
        const targetTab = event.currentTarget.getAttribute('data-target');
        const targetElement = document.getElementById(targetTab);
        if (targetElement) {
            targetElement.classList.add('active');
            event.currentTarget.classList.add('active');
            loadTabContent(targetTab);
        } else {
            console.error(`Contenu de l'onglet ${targetTab} introuvable.`);
        }
    };

    // Fonction de changement de thème
    const switchTheme = (event) => {
        const theme = event.currentTarget.getAttribute('data-theme');
        body.setAttribute('data-theme', theme);
    };

    // Ajout des écouteurs aux onglets et thèmes
    tabs.forEach(tab => tab.addEventListener('click', switchTab));
    themeToggles.forEach(toggle => toggle.addEventListener('click', switchTheme));

    // Chargement initial
    const initialTab = document.querySelector('.tab.active');
    if (initialTab) {
        loadTabContent(initialTab.getAttribute('data-target'));
    } else if (tabs.length > 0) {
        tabs[0].classList.add('active');
        loadTabContent(tabs[0].getAttribute('data-target'));
    }
    
    if (themeToggles.length > 0) {
        body.setAttribute('data-theme', themeToggles[0].getAttribute('data-theme'));
    }

    console.log('app.js : script chargé');
});
