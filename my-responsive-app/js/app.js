// Main application script to handle tab navigation and theme switching
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const themeStylesheet = document.getElementById('themeStylesheet');

    // Function to switch tabs
    function switchTab(event) {
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active'); // Hide all tab contents
        });
        tabs.forEach(tab => {
            tab.classList.remove('active'); // Remove active class from all tabs
        });

        const targetTab = event.target.getAttribute('data-target');
        document.getElementById(targetTab).classList.add('active'); // Show the selected tab content
        event.target.classList.add('active'); // Add active class to the clicked tab
    }

    // Function to switch themes
    function switchTheme(event) {
        const theme = event.target.getAttribute('data-theme');
        themeStylesheet.setAttribute('href', `css/themes/${theme}.css`);
    }

    // Event listeners for tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', switchTab);
    });

    // Event listeners for theme toggles
    themeToggles.forEach(themeToggle => {
        themeToggle.addEventListener('click', switchTheme);
    });

    // Set default tab and theme
    tabs[0].click(); // Activate the first tab by default
    themeToggles[0].click(); // Activate the first theme by default
});