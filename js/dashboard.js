(function() {
    'use strict';
    
    // Questions from main app (needed for display)
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
    
    async function loadDashboardData() {
        const dashboardContent = document.getElementById('dashboard-content');
        
        // Show loading state
        dashboardContent.innerHTML = `
            <div class="no-data">
                <h2>Data ophalen...</h2>
                <p>Een moment geduld alstublieft</p>
            </div>
        `;
        
        try {
            // Load from Firebase
            const scanData = await loadDashboardStats();
            
            if (!scanData || !scanData.totalScans || scanData.totalScans === 0) {
                dashboardContent.innerHTML = `
                    <div class="no-data">
                        <h2>Nog geen data beschikbaar</h2>
                        <p>Er zijn nog geen scans voltooid. Start een scan om data te verzamelen.</p>
                    </div>
                `;
                return;
            }
            
            // Calculate statistics
            const totalScans = scanData.totalScans || 0;
            const talentCounts = scanData.talentCounts || {};
            const questionStats = scanData.questionStats || {};
        
        // Calculate talent percentages
        const talentPercentages = {};
        Object.keys(talentCounts).forEach(talent => {
            talentPercentages[talent] = Math.round((talentCounts[talent] / totalScans) * 100);
        });
        
        // Build HTML
        let html = `
            <!-- Total scans -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">${totalScans}</div>
                    <div class="stat-label">Totaal aantal scans</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-number talent-creatief">${talentPercentages.creatief || 0}%</div>
                    <div class="stat-label">Creatieve makers</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-number talent-digitaal">${talentPercentages.digitaal || 0}%</div>
                    <div class="stat-label">Digitale experts</div>
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
            
            <!-- Question statistics -->
            <h2 style="margin: 40px 0 30px; text-align: center; color: #333;">Antwoorden per vraag</h2>
        `;
        
        // Add statistics for each question
        questions.forEach((question, qIndex) => {
            const qStats = questionStats[`q${qIndex}`] || {};
            const totalAnswers = Object.values(qStats).reduce((sum, count) => sum + (count || 0), 0) || 1;
            
            html += `
                <div class="question-stats">
                    <div class="question-title">Vraag ${qIndex + 1}: ${question.text}</div>
            `;
            
            // Get answer options for this question
            const answerOptions = getAnswerOptions(qIndex);
            answerOptions.forEach((option, oIndex) => {
                const count = qStats[`a${oIndex}`] || 0;
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
        
        // Animate progress bars
        setTimeout(() => {
            document.querySelectorAll('.answer-progress-bar').forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }, 100);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            dashboardContent.innerHTML = `
                <div class="no-data">
                    <h2>Fout bij ophalen data</h2>
                    <p>Er is een probleem opgetreden. Probeer het later opnieuw.</p>
                </div>
            `;
        }
    }
    
    function getAnswerOptions(questionIndex) {
        // Answer options for each question
        const allOptions = [
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"],
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"],
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"],
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"],
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"],
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"],
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"],
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"],
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"],
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"],
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"],
            ["Helemaal niet", "Een beetje", "Best wel", "Heel erg"]
        ];
        
        return allOptions[questionIndex] || ["Optie 1", "Optie 2", "Optie 3", "Optie 4"];
    }
    
    // Initialize dashboard
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Wait for Firebase to initialize
            setTimeout(loadDashboardData, 500);
        });
    } else {
        setTimeout(loadDashboardData, 500);
    }
    
    // Set up real-time listener if Firebase is available
    setTimeout(() => {
        if (typeof subscribeToDashboardStats === 'function') {
            subscribeToDashboardStats((data) => {
                if (data) {
                    renderDashboard(data);
                }
            });
        } else {
            // Fallback to polling if Firebase not available
            setInterval(() => {
                if (!document.hidden) {
                    loadDashboardData();
                }
            }, 5000);
        }
    }, 1000);
    
    function renderDashboard(scanData) {
        const dashboardContent = document.getElementById('dashboard-content');
        
        if (!scanData || !scanData.totalScans || scanData.totalScans === 0) {
            dashboardContent.innerHTML = `
                <div class="no-data">
                    <h2>Nog geen data beschikbaar</h2>
                    <p>Er zijn nog geen scans voltooid. Start een scan om data te verzamelen.</p>
                </div>
            `;
            return;
        }
        
        // Calculate statistics
        const totalScans = scanData.totalScans || 0;
        const talentCounts = scanData.talentCounts || {};
        const questionStats = scanData.questionStats || {};
        
        // Calculate talent percentages
        const talentPercentages = {};
        Object.keys(talentCounts).forEach(talent => {
            talentPercentages[talent] = Math.round((talentCounts[talent] / totalScans) * 100);
        });
        
        // Build HTML
        let html = `
            <!-- Total scans -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">${totalScans}</div>
                    <div class="stat-label">Totaal aantal scans</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-number talent-creatief">${talentPercentages.creatief || 0}%</div>
                    <div class="stat-label">Creatieve makers</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-number talent-digitaal">${talentPercentages.digitaal || 0}%</div>
                    <div class="stat-label">Digitale experts</div>
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
            
            <!-- Question statistics -->
            <h2 style="margin: 40px 0 30px; text-align: center; color: #333;">Antwoorden per vraag</h2>
        `;
        
        // Add statistics for each question
        questions.forEach((question, qIndex) => {
            const qStats = questionStats[`q${qIndex}`] || {};
            const totalAnswers = Object.values(qStats).reduce((sum, count) => sum + (count || 0), 0) || 1;
            
            html += `
                <div class="question-stats">
                    <div class="question-title">Vraag ${qIndex + 1}: ${question.text}</div>
            `;
            
            // Get answer options for this question
            const answerOptions = getAnswerOptions(qIndex);
            answerOptions.forEach((option, oIndex) => {
                const count = qStats[`a${oIndex}`] || 0;
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
        
        // Animate progress bars
        setTimeout(() => {
            document.querySelectorAll('.answer-progress-bar').forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }, 100);
    }
})();