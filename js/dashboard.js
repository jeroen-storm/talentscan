(function() {
    'use strict';

    const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzsuLGhnz62oZS6jf1r95tkxNYEQJ8LveEmba9fxJPmKiq6fTjSwbSuT3r7iKJheHU3hQ/exec';

    async function loadDashboardData() {
        const dashboardContent = document.getElementById('dashboard-content');

        dashboardContent.innerHTML = `
            <div class="no-data">
                <h2>Data ophalen...</h2>
                <p>Een moment geduld alstublieft</p>
            </div>
        `;

        try {
            const response = await fetch(SHEETS_URL);
            const data = await response.json();

            if (!data || data.totalScans === 0) {
                dashboardContent.innerHTML = `
                    <div class="no-data">
                        <h2>Nog geen data beschikbaar</h2>
                        <p>Er zijn nog geen scans voltooid. Start een scan om data te verzamelen.</p>
                    </div>
                `;
                return;
            }

            const totalScans = data.totalScans || 0;
            const talentCounts = data.talentCounts || {};

            // Calculate percentages
            const talentPercentages = {};
            Object.keys(talentCounts).forEach(talent => {
                talentPercentages[talent] = totalScans > 0
                    ? Math.round((talentCounts[talent] / totalScans) * 100)
                    : 0;
            });

            dashboardContent.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${totalScans}</div>
                        <div class="stat-label">Totaal aantal scans</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number talent-creatief">${talentCounts.creatief || 0}</div>
                        <div class="stat-label">Creatief (${talentPercentages.creatief || 0}%)</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number talent-digitaal">${talentCounts.digitaal || 0}</div>
                        <div class="stat-label">Digitaal (${talentPercentages.digitaal || 0}%)</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number talent-onderzoekend">${talentCounts.onderzoekend || 0}</div>
                        <div class="stat-label">Onderzoekend (${talentPercentages.onderzoekend || 0}%)</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-number talent-sociaal">${talentCounts.sociaal || 0}</div>
                        <div class="stat-label">Sociaal (${talentPercentages.sociaal || 0}%)</div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 40px;">
                    <p style="color: #666;">Bekijk de volledige data in de
                        <a href="https://docs.google.com/spreadsheets" target="_blank" style="color: #ff6f61;">Google Spreadsheet</a>
                    </p>
                    <button onclick="loadDashboardData()" style="margin-top: 20px; padding: 10px 20px; background: #ff6f61; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        Vernieuwen
                    </button>
                </div>
            `;

        } catch (error) {
            console.error('Error loading dashboard data:', error);
            dashboardContent.innerHTML = `
                <div class="no-data">
                    <h2>Fout bij ophalen data</h2>
                    <p>Er is een probleem opgetreden. Probeer het later opnieuw.</p>
                    <p style="color: #999; font-size: 0.9rem;">${error.message}</p>
                </div>
            `;
        }
    }

    // Make function globally available for refresh button
    window.loadDashboardData = loadDashboardData;

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDashboardData);
    } else {
        loadDashboardData();
    }
})();
