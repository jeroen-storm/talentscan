// Talent Lab Scan - Main Application Module
(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        TOTAL_QUESTIONS: 12,
        MAX_SCORE_PER_TALENT: 36,
        ANIMATION_DURATION: 300,
        STORAGE_KEY: 'talentScanProgress',
        DEBUG_MODE: false
    };

    // Application State
    const state = {
        currentQuestion: 0,
        currentIntro: 0,
        answers: [],
        scores: {
            creatief: 0,
            digitaal: 0,
            onderzoekend: 0,
            sociaal: 0
        },
        startTime: null,
        endTime: null
    };

    // Data Module
    const dataModule = {
        getIntroTexts() {
            return [
                {
                    situation: "Je krijgt een groepsopdracht voor school...",
                    context: "Iedereen heeft verschillende ideeën en voorkeuren...", 
                    question: "Welke rol ga jij spontaan aannemen?"
                },
                {
                    situation: "Het is weekend en je hebt vrije tijd...",
                    context: "Je kunt kiezen wat je gaat doen...",
                    question: "Waar besteed je je tijd het liefst aan?"
                },
                {
                    situation: "Vrienden vragen wat je goed kunt...",
                    context: "Iedereen heeft zijn eigen talenten...",
                    question: "Waar krijg jij complimenten voor?"
                },
                {
                    situation: "Je bent op school aan het leren...",
                    context: "Sommige vakken vind je leuker dan andere...",
                    question: "Bij welke vakken voel je je het meest op je plek?"
                },
                {
                    situation: "Er is een conflict in je vriendengroep...",
                    context: "Mensen zijn boos en verdrietig...",
                    question: "Hoe ga jij hiermee om?"
                },
                {
                    situation: "Je wilt iets delen op sociale media...",
                    context: "Je hebt verschillende soorten content...",
                    question: "Wat post je het liefst?"
                },
                {
                    situation: "Het weekend staat voor de deur...",
                    context: "Je kunt helemaal je eigen ding doen...",
                    question: "Hoe ziet jouw perfecte weekend eruit?"
                },
                {
                    situation: "Je denkt na over je toekomst...",
                    context: "Er zijn zoveel verschillende beroepen...",
                    question: "Wat lijkt je het leukst om later te doen?"
                },
                {
                    situation: "Je wilt iets nieuws leren...",
                    context: "Er zijn verschillende manieren om te leren...",
                    question: "Hoe leer jij het beste nieuwe dingen?"
                },
                {
                    situation: "Je voelt je gestrest over iets...",
                    context: "Verschillende dingen kunnen stress veroorzaken...",
                    question: "Wanneer voel jij je het meest gestrest?"
                },
                {
                    situation: "Mensen geven je complimenten...",
                    context: "Iedereen hoort graag positieve dingen...",
                    question: "Welk compliment krijg jij het vaakst?"
                },
                {
                    situation: "Je moet een presentatie geven...",
                    context: "De hele klas kijkt naar je...",
                    question: "Hoe pak jij dit aan?"
                }
            ];
        },

        getQuestions() {
            return [
                {
                    text: "Als je een groepsopdracht krijgt voor school, welke rol neem je meestal aan?",
                    options: [
                        { text: "Ik bedenk originele ideeën en schrijf de teksten", scores: {creatief: 3, sociaal: 1} },
                        { text: "Ik maak de visuele presentatie en zorg voor het digitale deel", scores: {digitaal: 3, onderzoekend: 1} },
                        { text: "Ik zoek alle benodigde informatie en controleer de feiten", scores: {onderzoekend: 3, digitaal: 1} },
                        { text: "Ik verdeel de taken en zorg dat iedereen meedoet", scores: {sociaal: 3, creatief: 1} }
                    ]
                },
                {
                    text: "In je vrije tijd ben je het liefst bezig met:",
                    options: [
                        { text: "Schrijven, lezen of verhalen bedenken", scores: {creatief: 3} },
                        { text: "Tekenen, ontwerpen of dingen maken op de computer", scores: {digitaal: 3} },
                        { text: "Dingen uitzoeken, puzzels oplossen of experimenteren", scores: {onderzoekend: 3} },
                        { text: "Afspreken met vrienden of activiteiten organiseren", scores: {sociaal: 3} }
                    ]
                },
                {
                    text: "Waar ben je volgens anderen goed in?",
                    options: [
                        { text: "Verhalen vertellen en grappige dingen bedenken", scores: {creatief: 2, sociaal: 1} },
                        { text: "Mooi vormgeven en technische dingen uitvogelen", scores: {digitaal: 2, onderzoekend: 1} },
                        { text: "Informatie vinden en complexe dingen begrijpen", scores: {onderzoekend: 2, digitaal: 1} },
                        { text: "Luisteren naar anderen en conflicten oplossen", scores: {sociaal: 2, creatief: 1} }
                    ]
                },
                {
                    text: "Welke vakken vind je het interessantst?",
                    options: [
                        { text: "Nederlands, geschiedenis, filosofie", scores: {creatief: 2, onderzoekend: 1} },
                        { text: "Informatica, techniek, beeldende vorming", scores: {digitaal: 2, creatief: 1} },
                        { text: "Wiskunde, natuurkunde, biologie", scores: {onderzoekend: 2, digitaal: 1} },
                        { text: "Mentoruur, maatschappijleer, lichamelijke opvoeding", scores: {sociaal: 2, creatief: 1} }
                    ]
                },
                {
                    text: "Als er een probleem is in je vriendengroep, wat doe je dan?",
                    options: [
                        { text: "Ik probeer het probleem weg te praten met humor of verhalen", scores: {creatief: 2, sociaal: 1} },
                        { text: "Ik zoek praktische oplossingen en maak eventueel een schema", scores: {digitaal: 1, onderzoekend: 2} },
                        { text: "Ik analyseer wat er precies aan de hand is en zoek feiten", scores: {onderzoekend: 3} },
                        { text: "Ik breng iedereen bij elkaar en help ze praten", scores: {sociaal: 3} }
                    ]
                },
                {
                    text: "Wat post je het liefst op sociale media?",
                    options: [
                        { text: "Grappige teksten, memes of verhalen", scores: {creatief: 2, sociaal: 1} },
                        { text: "Mooie foto's, video's of creatieve content", scores: {digitaal: 2, creatief: 1} },
                        { text: "Interessante feiten, nieuws of informatieve posts", scores: {onderzoekend: 2, sociaal: 1} },
                        { text: "Foto's van activiteiten met vrienden", scores: {sociaal: 2, creatief: 1} }
                    ]
                },
                {
                    text: "Hoe ziet jouw perfecte weekend eruit?",
                    options: [
                        { text: "Een goed boek lezen, film kijken of creatief bezig zijn", scores: {creatief: 3} },
                        { text: "Nieuwe apps proberen, video's maken of iets ontwerpen", scores: {digitaal: 3} },
                        { text: "Een museum bezoeken, documentaire kijken of iets nieuws leren", scores: {onderzoekend: 3} },
                        { text: "Leuke dingen doen met vrienden of familie", scores: {sociaal: 3} }
                    ]
                },
                {
                    text: "Wat lijkt je het leukst om later te doen?",
                    options: [
                        { text: "Schrijver, journalist, acteur of iets met verhalen", scores: {creatief: 3} },
                        { text: "Game designer, architect, filmmaker of iets met ontwerpen", scores: {digitaal: 3} },
                        { text: "Onderzoeker, dokter, advocaat of iets met analyseren", scores: {onderzoekend: 3} },
                        { text: "Leraar, psycholoog, manager of iets met mensen", scores: {sociaal: 3} }
                    ]
                },
                {
                    text: "Hoe leer je het liefst nieuwe dingen?",
                    options: [
                        { text: "Door verhalen, voorbeelden en ervaringen van anderen", scores: {creatief: 2, sociaal: 1} },
                        { text: "Door zelf te experimenteren en dingen uit te proberen", scores: {digitaal: 2, onderzoekend: 1} },
                        { text: "Door informatie op te zoeken en goed door te lezen", scores: {onderzoekend: 3} },
                        { text: "Door samen met anderen te oefenen en te bespreken", scores: {sociaal: 2, creatief: 1} }
                    ]
                },
                {
                    text: "Wanneer voel je je het meest gestrest?",
                    options: [
                        { text: "Als ik geen inspiratie heb of niet creatief kan zijn", scores: {creatief: 2} },
                        { text: "Als technologie niet werkt of ik iets niet digitaal kan maken", scores: {digitaal: 2} },
                        { text: "Als ik informatie mis of iets niet goed begrijp", scores: {onderzoekend: 2} },
                        { text: "Als er ruzie is of mensen niet goed samenwerken", scores: {sociaal: 2} }
                    ]
                },
                {
                    text: "Welk compliment krijg je het vaakst?",
                    options: [
                        { text: "Je hebt altijd leuke ideeën!", scores: {creatief: 3} },
                        { text: "Jij weet altijd hoe dingen werken!", scores: {digitaal: 2, onderzoekend: 1} },
                        { text: "Je weet veel en kunt goed uitleggen!", scores: {onderzoekend: 2, sociaal: 1} },
                        { text: "Je bent altijd aardig en behulpzaam!", scores: {sociaal: 3} }
                    ]
                },
                {
                    text: "Als je een presentatie moet geven, wat doe je dan?",
                    options: [
                        { text: "Ik vertel het als een verhaal met voorbeelden", scores: {creatief: 2, sociaal: 1} },
                        { text: "Ik maak een mooie slideshow met plaatjes en video's", scores: {digitaal: 2, creatief: 1} },
                        { text: "Ik verzamel veel informatie en zorg dat alles klopt", scores: {onderzoekend: 2, digitaal: 1} },
                        { text: "Ik zorg dat iedereen meedoet en betrokken blijft", scores: {sociaal: 2, onderzoekend: 1} }
                    ]
                }
            ];
        },

        getTalentInfo() {
            return {
                creatief: {
                    name: "Creatieve verhalenverteller",
                    description: "Jij bent een creatieve verhalenverteller! Je hebt een natuurlijk talent voor taal, verhalen en originele ideeën. Je kunt goed communiceren en weet hoe je anderen kunt boeien met je creativiteit. Woorden zijn jouw kracht!",
                    image: "IMG/Creatieve verhalenvertellers.png",
                    activities: [
                        "Verhalen schrijven en storytelling workshops",
                        "Meedoen aan de DINK-jongerenredactie",
                        "Podcast maken in de maakplaats",
                        "Deelnemen aan debatavonden",
                        "Boekreviews schrijven voor de bibliotheek"
                    ]
                },
                digitaal: {
                    name: "Digitale ontwerper",
                    description: "Jij bent een digitale ontwerper! Je hebt een oog voor design en weet hoe je technologie kunt gebruiken om mooie dingen te maken. Creativiteit en techniek komen bij jou samen. Je bent de brug tussen idee en realisatie!",
                    image: "IMG/Digitale ontwerpers.png",
                    activities: [
                        "3D-ontwerpen maken in de maakplaats",
                        "Video editing en green screen workshops",
                        "Websites en apps ontwerpen",
                        "Digitale portfolio's maken",
                        "Programmeren en game development"
                    ]
                },
                onderzoekend: {
                    name: "Onderzoekende denker",
                    description: "Jij bent een onderzoekende denker! Je bent nieuwsgierig en wilt altijd weten hoe dingen werken. Je kunt goed informatie vinden, analyseren en begrijpen. Jouw kracht ligt in het ontdekken van de waarheid achter de dingen!",
                    image: "IMG/Onderzoekende denkers.png",
                    activities: [
                        "Onderzoeksprojecten in het kennisplein",
                        "Online cursussen volgen via GoodHabitz/Soofos",
                        "Fact-checking workshops",
                        "Databases en bronnenonderzoek",
                        "Studiebegeleiding voor anderen"
                    ]
                },
                sociaal: {
                    name: "Sociale verbinder",
                    description: "Jij bent een sociale verbinder! Je bent goed met mensen en weet hoe je groepen kunt begeleiden. Je luistert goed en helpt anderen graag. Samenwerking en verbinding maken zijn jouw sterke punten!",
                    image: "IMG/Sociale verbinders.png",
                    activities: [
                        "Workshops en activiteiten organiseren",
                        "Debatclubs leiden en modereren",
                        "Peer-to-peer begeleiding",
                        "Evenementen plannen in de bibliotheek",
                        "Vrijwilligerswerk en community building"
                    ]
                }
            };
        }
    };

    // DOM Module
    const domModule = {
        getElement(id) {
            return document.getElementById(id);
        },

        showScreen(screenId) {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            
            const targetScreen = this.getElement(screenId);
            if (targetScreen) {
                targetScreen.classList.add('active');
                
                // Accessibility: Focus management
                targetScreen.setAttribute('tabindex', '-1');
                targetScreen.focus();
            }
        },

        updateProgress(current, total, elementId) {
            const progress = (current / total) * 100;
            const progressBar = this.getElement(elementId);
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
                progressBar.setAttribute('aria-valuenow', progress);
            }
        },

        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    };

    // Storage Module
    const storageModule = {
        saveProgress() {
            try {
                const data = {
                    state: state,
                    timestamp: Date.now()
                };
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
                return true;
            } catch (e) {
                console.error('Failed to save progress:', e);
                return false;
            }
        },

        loadProgress() {
            try {
                const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
                if (saved) {
                    const data = JSON.parse(saved);
                    // Check if saved data is less than 24 hours old
                    if (Date.now() - data.timestamp < 86400000) {
                        return data.state;
                    }
                }
            } catch (e) {
                console.error('Failed to load progress:', e);
            }
            return null;
        },

        clearProgress() {
            try {
                localStorage.removeItem(CONFIG.STORAGE_KEY);
                return true;
            } catch (e) {
                console.error('Failed to clear progress:', e);
                return false;
            }
        }
    };

    // Quiz Controller
    const quizController = {
        init() {
            this.bindEvents();
            this.checkForSavedProgress();
            state.startTime = Date.now();
        },

        bindEvents() {
            // Event delegation for better performance
            document.addEventListener('click', (e) => {
                if (e.target.matches('#intro-next-btn')) {
                    this.nextFromIntro();
                } else if (e.target.matches('#next-btn')) {
                    this.nextQuestion();
                } else if (e.target.matches('#prev-btn')) {
                    this.previousQuestion();
                } else if (e.target.matches('.option')) {
                    this.selectOption(e.target);
                }
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.target.matches('.option')) {
                    this.selectOption(e.target);
                } else if (e.key === 'ArrowRight' && !domModule.getElement('next-btn')?.disabled) {
                    this.nextQuestion();
                } else if (e.key === 'ArrowLeft' && !domModule.getElement('prev-btn')?.disabled) {
                    this.previousQuestion();
                }
            });

            // Auto-save on page unload
            window.addEventListener('beforeunload', () => {
                if (state.currentQuestion > 0 && state.currentQuestion < CONFIG.TOTAL_QUESTIONS) {
                    storageModule.saveProgress();
                }
            });
        },

        checkForSavedProgress() {
            const saved = storageModule.loadProgress();
            if (saved && saved.currentQuestion > 0) {
                if (confirm('Je hebt een onvoltooide scan. Wil je verder gaan waar je gebleven was?')) {
                    Object.assign(state, saved);
                    this.showQuestion();
                    domModule.showScreen('questions');
                } else {
                    storageModule.clearProgress();
                    this.startScan();
                }
            } else {
                this.startScan();
            }
        },

        startScan() {
            state.currentIntro = 0;
            state.currentQuestion = 0;
            state.answers = [];
            state.scores = {creatief: 0, digitaal: 0, onderzoekend: 0, sociaal: 0};
            this.showIntro();
        },

        showIntro() {
            domModule.showScreen('intro');
            
            const introTexts = dataModule.getIntroTexts();
            const introText = introTexts[state.currentIntro];
            const introTextElement = domModule.getElement('intro-text');
            
            if (introTextElement && introText) {
                introTextElement.querySelector('.situation-line').textContent = introText.situation;
                introTextElement.querySelector('.context-line').textContent = introText.context;
                introTextElement.querySelector('.question-line').textContent = introText.question;
            }
            
            const counter = domModule.getElement('intro-counter');
            if (counter) {
                counter.textContent = `Vraag ${state.currentIntro + 1} van ${CONFIG.TOTAL_QUESTIONS}`;
            }
            
            domModule.updateProgress(state.currentIntro, CONFIG.TOTAL_QUESTIONS, 'intro-progress');
        },

        nextFromIntro() {
            domModule.showScreen('questions');
            this.showQuestion();
            const nav = document.querySelector('.navigation');
            if (nav) nav.style.display = 'flex';
        },

        showQuestion() {
            const questions = dataModule.getQuestions();
            const question = questions[state.currentQuestion];
            
            const questionText = domModule.getElement('question-text');
            if (questionText) {
                questionText.textContent = question.text;
            }
            
            const counter = domModule.getElement('counter');
            if (counter) {
                counter.textContent = `Vraag ${state.currentQuestion + 1} van ${CONFIG.TOTAL_QUESTIONS}`;
                counter.style.display = 'block';
            }
            
            domModule.updateProgress(state.currentQuestion, CONFIG.TOTAL_QUESTIONS, 'progress');
            
            const optionsContainer = domModule.getElement('options');
            if (optionsContainer) {
                optionsContainer.innerHTML = '';
                
                question.options.forEach((option, index) => {
                    const optionDiv = document.createElement('div');
                    optionDiv.className = 'option';
                    optionDiv.textContent = option.text;
                    optionDiv.dataset.index = index;
                    optionDiv.setAttribute('role', 'button');
                    optionDiv.setAttribute('tabindex', '0');
                    optionDiv.setAttribute('aria-label', `Optie ${index + 1}: ${option.text}`);
                    
                    if (state.answers[state.currentQuestion] === index) {
                        optionDiv.classList.add('selected');
                        optionDiv.setAttribute('aria-selected', 'true');
                    }
                    
                    optionsContainer.appendChild(optionDiv);
                });
            }
            
            this.updateNavigation();
            
            // Save progress
            if (state.currentQuestion > 0) {
                storageModule.saveProgress();
            }
        },

        selectOption(optionElement) {
            const index = parseInt(optionElement.dataset.index);
            state.answers[state.currentQuestion] = index;
            
            document.querySelectorAll('.option').forEach(option => {
                option.classList.remove('selected');
                option.setAttribute('aria-selected', 'false');
            });
            
            optionElement.classList.add('selected');
            optionElement.setAttribute('aria-selected', 'true');
            
            this.updateNavigation();
            
            // Auto-advance after selection (with delay for UX)
            setTimeout(() => {
                if (state.currentQuestion < CONFIG.TOTAL_QUESTIONS - 1) {
                    this.nextQuestion();
                }
            }, CONFIG.ANIMATION_DURATION);
        },

        updateNavigation() {
            const prevBtn = domModule.getElement('prev-btn');
            const nextBtn = domModule.getElement('next-btn');
            
            if (prevBtn) {
                prevBtn.disabled = state.currentQuestion === 0;
                prevBtn.setAttribute('aria-disabled', prevBtn.disabled);
            }
            
            if (nextBtn) {
                const isAnswered = state.answers[state.currentQuestion] !== undefined;
                nextBtn.disabled = !isAnswered;
                nextBtn.setAttribute('aria-disabled', nextBtn.disabled);
                nextBtn.textContent = state.currentQuestion === CONFIG.TOTAL_QUESTIONS - 1 ? 'Bekijk resultaat' : 'Volgende';
            }
        },

        nextQuestion() {
            if (state.answers[state.currentQuestion] !== undefined) {
                state.currentQuestion++;
                state.currentIntro++;
                
                if (state.currentQuestion < CONFIG.TOTAL_QUESTIONS) {
                    this.showIntro();
                } else {
                    this.calculateResults();
                }
            }
        },

        previousQuestion() {
            if (state.currentQuestion > 0) {
                state.currentQuestion--;
                state.currentIntro--;
                this.showQuestion();
                domModule.showScreen('questions');
            }
        },

        calculateResults() {
            state.endTime = Date.now();
            state.scores = {creatief: 0, digitaal: 0, onderzoekend: 0, sociaal: 0};
            
            const questions = dataModule.getQuestions();
            
            state.answers.forEach((answerIndex, questionIndex) => {
                const question = questions[questionIndex];
                const selectedOption = question.options[answerIndex];
                
                if (selectedOption && selectedOption.scores) {
                    Object.keys(selectedOption.scores).forEach(talent => {
                        state.scores[talent] += selectedOption.scores[talent];
                    });
                }
            });
            
            // Clear saved progress
            storageModule.clearProgress();
            
            this.displayResults();
        },

        displayResults() {
            const percentages = {};
            let primaryTalent = '';
            let maxPercentage = 0;
            
            Object.keys(state.scores).forEach(talent => {
                percentages[talent] = Math.round((state.scores[talent] / CONFIG.MAX_SCORE_PER_TALENT) * 100);
                if (percentages[talent] > maxPercentage) {
                    maxPercentage = percentages[talent];
                    primaryTalent = talent;
                }
            });
            
            // Build URL parameters
            const urlParams = new URLSearchParams();
            urlParams.set('primary', primaryTalent);
            Object.keys(percentages).forEach(talent => {
                urlParams.set(talent, percentages[talent]);
            });
            
            // Add timing data for analytics
            if (state.startTime && state.endTime) {
                const duration = Math.round((state.endTime - state.startTime) / 1000);
                urlParams.set('duration', duration);
            }
            
            // Redirect to results page
            window.location.href = `results.html?${urlParams.toString()}`;
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => quizController.init());
    } else {
        quizController.init();
    }

    // Export for testing purposes
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            CONFIG,
            state,
            dataModule,
            domModule,
            storageModule,
            quizController
        };
    }
})();