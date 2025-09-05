// Talent Lab Scan - Results Module
(function() {
    'use strict';

    // Talent information
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

    // Utility functions
    const utils = {
        getUrlParams() {
            const params = new URLSearchParams(window.location.search);
            const result = {
                primary: params.get('primary') || 'sociaal',
                creatief: parseInt(params.get('creatief')) || 0,
                digitaal: parseInt(params.get('digitaal')) || 0,
                onderzoekend: parseInt(params.get('onderzoekend')) || 0,
                sociaal: parseInt(params.get('sociaal')) || 0,
                duration: parseInt(params.get('duration')) || 0
            };
            
            // Validate primary talent
            if (!talentInfo[result.primary]) {
                result.primary = 'sociaal';
            }
            
            return result;
        },

        sanitizeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        createTalentCard(talent, percentage, isPrimary = false) {
            const card = document.createElement('div');
            card.className = `talent-card ${talent} ${isPrimary ? 'primary' : ''}`;
            card.innerHTML = `
                <h3>${this.sanitizeHtml(talentInfo[talent].name)}</h3>
                <div class="percentage" role="meter" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100">
                    ${percentage}%
                </div>
            `;
            return card;
        },

        lazyLoadImage(src, alt) {
            const img = new Image();
            img.src = src;
            img.alt = alt;
            img.loading = 'lazy';
            img.onerror = () => {
                console.error(`Failed to load image: ${src}`);
                img.src = 'IMG/group.png'; // Fallback image
            };
            return img;
        }
    };

    // Results Controller
    const resultsController = {
        init() {
            this.displayResults();
            this.bindEvents();
            this.trackAnalytics();
        },

        displayResults() {
            const results = utils.getUrlParams();
            const primaryTalent = results.primary;
            const maxPercentage = results[primaryTalent];
            
            // Update group image with lazy loading
            const groupImg = document.getElementById('group-result-img');
            if (groupImg) {
                const newImg = utils.lazyLoadImage(
                    talentInfo[primaryTalent].image,
                    talentInfo[primaryTalent].name
                );
                groupImg.parentNode.replaceChild(newImg, groupImg);
                newImg.id = 'group-result-img';
            }
            
            // Update primary talent
            const primaryTalentElement = document.getElementById('primary-talent');
            if (primaryTalentElement) {
                primaryTalentElement.className = `primary-talent ${primaryTalent}`;
                
                const nameElement = document.getElementById('primary-name');
                if (nameElement) {
                    nameElement.textContent = talentInfo[primaryTalent].name;
                }
                
                const percentageElement = document.getElementById('primary-percentage');
                if (percentageElement) {
                    percentageElement.textContent = `${maxPercentage}% match`;
                }
            }
            
            // Update talent scores with animation
            const scoresContainer = document.getElementById('talent-scores');
            if (scoresContainer) {
                scoresContainer.innerHTML = '';
                
                // Sort talents by percentage for better UX
                const sortedTalents = Object.keys(talentInfo).sort((a, b) => results[b] - results[a]);
                
                sortedTalents.forEach((talent, index) => {
                    const card = utils.createTalentCard(talent, results[talent], talent === primaryTalent);
                    
                    // Add animation delay
                    setTimeout(() => {
                        scoresContainer.appendChild(card);
                        card.style.animation = 'slideIn 0.3s ease-out';
                    }, index * 100);
                });
            }
            
            // Update description
            const descriptionText = document.getElementById('description-text');
            if (descriptionText) {
                descriptionText.textContent = talentInfo[primaryTalent].description;
            }
            
            // Show completion time if available
            if (results.duration > 0) {
                this.showCompletionTime(results.duration);
            }
        },

        showCompletionTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            const timeText = `Voltooid in ${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
            
            const timeElement = document.createElement('div');
            timeElement.className = 'completion-time';
            timeElement.textContent = timeText;
            
            const container = document.querySelector('.results-content');
            if (container) {
                container.insertBefore(timeElement, container.firstChild);
            }
        },

        bindEvents() {
            // Share functionality
            this.addShareButtons();
            
            // Print functionality
            this.addPrintButton();
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'r' && e.ctrlKey) {
                    e.preventDefault();
                    window.location.href = 'start.html';
                }
            });
        },

        addShareButtons() {
            const shareContainer = document.createElement('div');
            shareContainer.className = 'share-buttons';
            shareContainer.innerHTML = `
                <button class="btn-share" id="share-whatsapp" aria-label="Deel via WhatsApp">
                    WhatsApp
                </button>
                <button class="btn-share" id="share-copy" aria-label="Kopieer link">
                    Link kopiëren
                </button>
            `;
            
            const resultsContent = document.querySelector('.results-content');
            if (resultsContent) {
                resultsContent.appendChild(shareContainer);
            }
            
            // WhatsApp share
            document.getElementById('share-whatsapp')?.addEventListener('click', () => {
                const text = `Ik heb de Talent Lab Scan gedaan! Mijn talent is: ${talentInfo[utils.getUrlParams().primary].name}. Doe de test ook: ${window.location.origin}/start.html`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            });
            
            // Copy link
            document.getElementById('share-copy')?.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    const btn = document.getElementById('share-copy');
                    if (btn) {
                        btn.textContent = 'Gekopieerd!';
                        setTimeout(() => {
                            btn.textContent = 'Link kopiëren';
                        }, 2000);
                    }
                } catch (err) {
                    console.error('Failed to copy link:', err);
                }
            });
        },

        addPrintButton() {
            const printButton = document.createElement('button');
            printButton.className = 'btn btn-print';
            printButton.textContent = 'Print resultaat';
            printButton.addEventListener('click', () => window.print());
            
            const resultsContent = document.querySelector('.results-content');
            if (resultsContent) {
                resultsContent.appendChild(printButton);
            }
        },

        trackAnalytics() {
            // Track results view (implement your analytics here)
            const results = utils.getUrlParams();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_results', {
                    'primary_talent': results.primary,
                    'completion_time': results.duration,
                    'highest_score': Math.max(results.creatief, results.digitaal, results.onderzoekend, results.sociaal)
                });
            }
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => resultsController.init());
    } else {
        resultsController.init();
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .share-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin: 20px 0;
        }
        
        .btn-share {
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 10px 20px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-share:hover {
            background: rgba(255,255,255,0.3);
        }
        
        .btn-print {
            margin-top: 20px;
        }
        
        .completion-time {
            color: rgba(255,255,255,0.8);
            font-size: 0.9em;
            margin-bottom: 10px;
        }
        
        @media print {
            .share-buttons, .btn-print, button {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
})();