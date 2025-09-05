(function() {
    'use strict';
    
    const questions = [
        { text: "Ik ben goed in het bedenken van nieuwe ideeën" },
        { text: "Ik werk graag met computers en technologie" },
        { text: "Ik ben nieuwsgierig naar hoe dingen werken" },
        { text: "Ik help anderen graag met hun problemen" },
        { text: "Ik vind het leuk om dingen te maken of te ontwerpen" },
        { text: "Ik ben goed in het oplossen van technische problemen" },
        { text: "Ik zoek graag dingen uit en doe onderzoek" },
        { text: "Ik kan goed luisteren naar anderen" },
        { text: "Ik ben volgens anderen goed in creatief denken" },
        { text: "Ik ben volgens anderen handig met apps en websites" },
        { text: "Ik ben volgens anderen goed in analyseren en uitzoeken" },
        { text: "Ik ben volgens anderen goed in samenwerken" }
    ];
    
    function loadDashboardData() {
        const dashboardContent = document.getElementById('dashboard-content');
        
        // Load from localStorage
        const scanData = JSON.parse(localStorage.getItem('talentScanStats') || '{}');
        
        if (!scanData.completedScans || scanData.completedScans === 0) {
            dashboardContent.innerHTML = `
                <div class="no-data">
                    <h2>Nog geen data beschikbaar</h2>
                    <p>Er zijn nog geen scans voltooid. Start een scan om data te verzamelen.</p>
                </div>
            `;
            return;
        }
        
        const totalScans = scanData.completedScans || 0;
        const talentCounts = scanData.talentResults || {};
        const questionStats = scanData.questionAnswers || {};
        
        // Calculate talent percentages
        const talentPercentages = {};
        Object.keys(talentCounts).forEach(talent => {
            talentPercentages[talent] = Math.round((talentCounts[talent] / totalScans) * 100);
        });
        
        let html = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">${totalScans}</div>
                    <div class="stat-label">Totaal aantal scans</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-number talent-creatief">${talentPercentages.creatief || 0}%</div>
                    <div class="stat-label">Creatieve verhalenvertellers</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-number talent-digitaal">${talentPercentages.digitaal || 0}%</div>
                    <div class="stat-label">Digitale ontwerpers</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-number talent-onderzoekend">${talentPercentages.onderzoekend || 0}%</div>
                    <div class="stat-label">Onderzoekende denkers</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-number talent-sociaal">${talentPercentages.sociaal || 0}%</div>
                    <div class="stat-label">Sociale verbinders</div>
                </div>
            </div>
            
            <h2 style="margin: 40px 0 30px; text-align: center; color: #333;">Antwoorden per vraag</h2>
        `;
        
        // Add statistics for each question
        questions.forEach((question, qIndex) => {
            const qStats = questionStats[qIndex] || {};
            const totalAnswers = Object.values(qStats).reduce((sum, count) => sum + (count || 0), 0) || 1;
            
            html += `
                <div class="question-stats">
                    <div class="question-title">Vraag ${qIndex + 1}: ${question.text}</div>
            `;
            
            const answerOptions = ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"];
            answerOptions.forEach((option, oIndex) => {
                const count = qStats[oIndex] || 0;
                const percentage = Math.round((count / totalAnswers) * 100);
                
                html += `
                    <div class="answer-bar">
                        <div class="answer-text">${option} (${count} keer gekozen)</div>
                        <div class="answer-progress">
                            <div class="answer-progress-bar" style="width: ${percentage}%">
                                ${percentage}%
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += `</div>`;
        });
        
        dashboardContent.innerHTML = html;
    }
    
    // Initialize dashboard
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDashboardData);
    } else {
        loadDashboardData();
    }
    
    // Auto-refresh every 30 seconds
    setInterval(loadDashboardData, 30000);
})();