// Talent Lab Scan - Results Module (Integrated)
// Maintains original functionality with improvements

(function() {
    'use strict';

    const talentInfo = {
        creatief: {
            name: "Creatieve verhalenverteller",
            description: "Jij bent een creatieve verhalenverteller! Je hebt een natuurlijk talent voor taal, verhalen en originele ideeën. Je kunt goed communiceren en weet hoe je anderen kunt boeien met je creativiteit. Woorden zijn jouw kracht!",
            image: "IMG/Creatieve verhalenvertellers.png"
        },
        digitaal: {
            name: "Digitale ontwerper",
            description: "Jij bent een digitale ontwerper! Je hebt een oog voor design en weet hoe je technologie kunt gebruiken om mooie dingen te maken. Creativiteit en techniek komen bij jou samen. Je bent de brug tussen idee en realisatie!",
            image: "IMG/Digitale ontwerpers.png"
        },
        onderzoekend: {
            name: "Onderzoekende denker",
            description: "Jij bent een onderzoekende denker! Je bent nieuwsgierig en wilt altijd weten hoe dingen werken. Je kunt goed informatie vinden, analyseren en begrijpen. Jouw kracht ligt in het ontdekken van de waarheid achter de dingen!",
            image: "IMG/Onderzoekende denkers.png"
        },
        sociaal: {
            name: "Sociale verbinder",
            description: "Jij bent een sociale verbinder! Je bent goed met mensen en weet hoe je groepen kunt begeleiden. Je luistert goed en helpt anderen graag. Samenwerking en verbinding maken zijn jouw sterke punten!",
            image: "IMG/Sociale verbinders.png"
        }
    };

    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        
        // Validate and sanitize parameters
        const result = {
            primary: params.get('primary') || 'sociaal',
            creatief: Math.max(0, Math.min(100, parseInt(params.get('creatief')) || 11)),
            digitaal: Math.max(0, Math.min(100, parseInt(params.get('digitaal')) || 25)),
            onderzoekend: Math.max(0, Math.min(100, parseInt(params.get('onderzoekend')) || 25)),
            sociaal: Math.max(0, Math.min(100, parseInt(params.get('sociaal')) || 39))
        };
        
        // Validate primary talent exists
        if (!talentInfo[result.primary]) {
            result.primary = 'sociaal';
        }
        
        return result;
    }

    function displayResults() {
        try {
            const results = getUrlParams();
            const primaryTalent = results.primary;
            const maxPercentage = results[primaryTalent];
            
            // Update group image with error handling
            const groupImg = document.getElementById('group-result-img');
            if (groupImg && talentInfo[primaryTalent]) {
                groupImg.src = talentInfo[primaryTalent].image;
                groupImg.alt = talentInfo[primaryTalent].name;
                
                // Add error handler for missing images
                groupImg.onerror = function() {
                    this.src = 'IMG/group.png'; // Fallback image
                };
            }
            
            // Update primary talent
            const primaryTalentElement = document.getElementById('primary-talent');
            if (primaryTalentElement) {
                primaryTalentElement.className = `primary-talent ${primaryTalent}`;
            }
            
            const primaryName = document.getElementById('primary-name');
            if (primaryName) {
                primaryName.textContent = talentInfo[primaryTalent].name;
            }
            
            const primaryPercentage = document.getElementById('primary-percentage');
            if (primaryPercentage) {
                primaryPercentage.textContent = `${maxPercentage}% match`;
            }
            
            // Update talent scores
            const scoresContainer = document.getElementById('talent-scores');
            if (scoresContainer) {
                scoresContainer.innerHTML = '';
                
                Object.keys(talentInfo).forEach(talent => {
                    const card = document.createElement('div');
                    card.className = `talent-card ${talent}`;
                    
                    const title = document.createElement('h3');
                    title.textContent = talentInfo[talent].name;
                    
                    const percentage = document.createElement('div');
                    percentage.className = 'percentage';
                    percentage.textContent = `${results[talent]}%`;
                    
                    card.appendChild(title);
                    card.appendChild(percentage);
                    scoresContainer.appendChild(card);
                });
            }
            
            // Update description
            const descriptionText = document.getElementById('description-text');
            if (descriptionText) {
                descriptionText.textContent = talentInfo[primaryTalent].description;
            }
            
        } catch (error) {
            console.error('Error displaying results:', error);
            // Show default results if error occurs
            const descriptionText = document.getElementById('description-text');
            if (descriptionText) {
                descriptionText.textContent = 'Er is een fout opgetreden bij het laden van je resultaten. Probeer de test opnieuw.';
            }
        }
    }
    
    // Function to navigate to talent overview page
    window.goToTalentOverview = function() {
        const urlParams = new URLSearchParams(window.location.search);
        const primaryTalent = urlParams.get('primary');
        
        if (primaryTalent) {
            // Map talent types to page names
            const pageMap = {
                'creatief': 'creatief.html',
                'digitaal': 'digitaal.html', 
                'onderzoekend': 'onderzoekend.html',
                'sociaal': 'sociaal.html'
            };
            
            const targetPage = pageMap[primaryTalent];
            if (targetPage) {
                window.location.href = targetPage;
            } else {
                // Fallback
                window.location.href = 'creatief.html';
            }
        } else {
            // Fallback if no primary talent found
            window.location.href = 'creatief.html';
        }
    };
    
    // Initialize page
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', displayResults);
    } else {
        displayResults();
    }
})();