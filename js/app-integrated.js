// Talent Lab Scan - Integrated Application
// Maintains original functionality with performance and security improvements

(function() {
    'use strict';

    // Original data structures preserved
    const introTexts = [
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
            situation: "Er is ruzie in je vriendengroep...",
            context: "Mensen zijn boos en verdrietig...",
            question: "Hoe ga jij hiermee om?"
        },
        {
            situation: "Je wilt iets delen op sociale media...",
            context: "Je hebt verschillende soorten dingen om te delen...",
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

    const questions = [
        {
            text: "Bij een groepsopdracht voor school neem ik meestal deze rol aan:",
            options: [
                { text: "Ik bedenk originele ideeën en schrijf de teksten", scores: {creatief: 3, sociaal: 1} },
                { text: "Ik maak de visuele presentatie en zorg voor het digitale deel", scores: {digitaal: 3, onderzoekend: 1} },
                { text: "Ik zoek alle benodigde informatie en controleer de feiten", scores: {onderzoekend: 3, digitaal: 1} },
                { text: "Ik verdeel de taken en zorg dat iedereen meedoet", scores: {sociaal: 3, creatief: 1} }
            ]
        },
        {
            text: "In mijn vrije tijd ben ik het liefst bezig met:",
            options: [
                { text: "Schrijven, lezen of verhalen bedenken", scores: {creatief: 3} },
                { text: "Tekenen, ontwerpen of dingen maken op de computer", scores: {digitaal: 3} },
                { text: "Dingen uitzoeken, puzzels oplossen of experimenteren", scores: {onderzoekend: 3} },
                { text: "Afspreken met vrienden of activiteiten organiseren", scores: {sociaal: 3} }
            ]
        },
        {
            text: "Ik ben volgens anderen goed in:",
            options: [
                { text: "Verhalen vertellen en grappige dingen bedenken", scores: {creatief: 2, sociaal: 1} },
                { text: "Mooi vormgeven en technische dingen uitzoeken", scores: {digitaal: 2, onderzoekend: 1} },
                { text: "Informatie vinden en moeilijke dingen begrijpen", scores: {onderzoekend: 2, digitaal: 1} },
                { text: "Luisteren naar anderen en ruzie oplossen", scores: {sociaal: 2, creatief: 1} }
            ]
        },
        {
            text: "Ik vind deze vakken het interessantst:",
            options: [
                { text: "Nederlands, geschiedenis, filosofie", scores: {creatief: 2, onderzoekend: 1} },
                { text: "Informatica, techniek, tekenen", scores: {digitaal: 2, creatief: 1} },
                { text: "Wiskunde, natuurkunde, biologie", scores: {onderzoekend: 2, digitaal: 1} },
                { text: "Mentoruur, maatschappijleer, sport", scores: {sociaal: 2, creatief: 1} }
            ]
        },
        {
            text: "Als er ruzie is in mijn vriendengroep, dan:",
            options: [
                { text: "Ik probeer het probleem weg te praten met humor of verhalen", scores: {creatief: 2, sociaal: 1} },
                { text: "Ik zoek handige oplossingen en maak eventueel een plan", scores: {digitaal: 1, onderzoekend: 2} },
                { text: "Ik zoek uit wat er precies aan de hand is", scores: {onderzoekend: 3} },
                { text: "Ik breng iedereen bij elkaar en help ze praten", scores: {sociaal: 3} }
            ]
        },
        {
            text: "Ik post het liefst dit op sociale media:",
            options: [
                { text: "Grappige teksten, memes of verhalen", scores: {creatief: 2, sociaal: 1} },
                { text: "Mooie foto's, video's of creatieve content", scores: {digitaal: 2, creatief: 1} },
                { text: "Interessante feiten, nieuws of informatieve posts", scores: {onderzoekend: 2, sociaal: 1} },
                { text: "Foto's van activiteiten met vrienden", scores: {sociaal: 2, creatief: 1} }
            ]
        },
        {
            text: "Mijn perfecte weekend ziet er zo uit:",
            options: [
                { text: "Een goed boek lezen, film kijken of creatief bezig zijn", scores: {creatief: 3} },
                { text: "Nieuwe apps proberen, video's maken of iets ontwerpen", scores: {digitaal: 3} },
                { text: "Een museum bezoeken, documentaire kijken of iets nieuws leren", scores: {onderzoekend: 3} },
                { text: "Leuke dingen doen met vrienden of familie", scores: {sociaal: 3} }
            ]
        },
        {
            text: "Later wil ik het liefst dit doen:",
            options: [
                { text: "Schrijver, journalist, acteur of iets met verhalen", scores: {creatief: 3} },
                { text: "Game designer, architect, filmmaker of iets met ontwerpen", scores: {digitaal: 3} },
                { text: "Onderzoeker, dokter, advocaat of iets met uitzoeken", scores: {onderzoekend: 3} },
                { text: "Leraar, psycholoog, manager of iets met mensen", scores: {sociaal: 3} }
            ]
        },
        {
            text: "Ik leer het liefst nieuwe dingen:",
            options: [
                { text: "Door verhalen, voorbeelden en ervaringen van anderen", scores: {creatief: 2, sociaal: 1} },
                { text: "Door zelf te experimenteren en dingen uit te proberen", scores: {digitaal: 2, onderzoekend: 1} },
                { text: "Door informatie op te zoeken en goed door te lezen", scores: {onderzoekend: 3} },
                { text: "Door samen met anderen te oefenen en te bespreken", scores: {sociaal: 2, creatief: 1} }
            ]
        },
        {
            text: "Ik voel me het meest gestrest als:",
            options: [
                { text: "Als ik geen goede ideeën heb of niet creatief kan zijn", scores: {creatief: 2} },
                { text: "Als technologie niet werkt of ik iets niet digitaal kan maken", scores: {digitaal: 2} },
                { text: "Als ik informatie mis of iets niet goed snap", scores: {onderzoekend: 2} },
                { text: "Als er ruzie is of mensen niet goed samenwerken", scores: {sociaal: 2} }
            ]
        },
        {
            text: "Ik krijg dit compliment het vaakst:",
            options: [
                { text: "Je hebt altijd leuke ideeën!", scores: {creatief: 3} },
                { text: "Jij weet altijd hoe dingen werken!", scores: {digitaal: 2, onderzoekend: 1} },
                { text: "Je weet veel en kunt goed uitleggen!", scores: {onderzoekend: 2, sociaal: 1} },
                { text: "Je bent altijd aardig en behulpzaam!", scores: {sociaal: 3} }
            ]
        },
        {
            text: "Als ik een presentatie moet geven, dan:",
            options: [
                { text: "Ik vertel het als een verhaal met voorbeelden", scores: {creatief: 2, sociaal: 1} },
                { text: "Ik maak een mooie slideshow met plaatjes en video's", scores: {digitaal: 2, creatief: 1} },
                { text: "Ik verzamel veel informatie en zorg dat alles klopt", scores: {onderzoekend: 2, digitaal: 1} },
                { text: "Ik zorg dat iedereen meedoet en betrokken blijft", scores: {sociaal: 2, onderzoekend: 1} }
            ]
        }
    ];

    const talentInfo = {
        creatief: {
            name: "Creatieve verhalenverteller",
            description: "Jij bent een creatieve verhalenverteller! Je hebt een natuurlijk talent voor taal, verhalen en originele ideeën. Je kunt goed communiceren en weet hoe je anderen kunt boeien met je creativiteit. Woorden zijn jouw kracht!",
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
            activities: [
                "Workshops en activiteiten organiseren",
                "Debatclubs leiden en modereren",
                "Peer-to-peer begeleiding",
                "Evenementen plannen in de bibliotheek",
                "Vrijwilligerswerk en community building"
            ]
        }
    };

    // State management with localStorage support
    let currentQuestion = 0;
    let currentIntro = 0;
    let answers = [];
    let scores = {creatief: 0, digitaal: 0, onderzoekend: 0, sociaal: 0};
    let questionOrder = [];  // Array to store randomized question indices
    let originalQuestionIndex = {}; // Map randomized index to original index

    // Randomize questions while keeping character/intro mapping
    function initializeQuestionOrder() {
        // Create array of indices [0, 1, 2, ..., 11]
        questionOrder = Array.from({length: questions.length}, (_, i) => i);
        
        // Fisher-Yates shuffle algorithm
        for (let i = questionOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionOrder[i], questionOrder[j]] = [questionOrder[j], questionOrder[i]];
        }
        
        // Create reverse mapping for easy lookup
        questionOrder.forEach((originalIndex, randomizedIndex) => {
            originalQuestionIndex[randomizedIndex] = originalIndex;
        });
    }

    // Save and load progress functions
    function saveProgress() {
        try {
            const progressData = {
                currentQuestion,
                currentIntro,
                answers,
                questionOrder,  // Save the randomized order
                originalQuestionIndex,
                timestamp: Date.now()
            };
            localStorage.setItem('talentScanProgress', JSON.stringify(progressData));
        } catch (e) {
            console.log('Could not save progress');
        }
    }

    function loadProgress() {
        try {
            const saved = localStorage.getItem('talentScanProgress');
            if (saved) {
                const data = JSON.parse(saved);
                // Check if saved data is less than 24 hours old
                if (Date.now() - data.timestamp < 86400000) {
                    // Restore the question order if it exists
                    if (data.questionOrder) {
                        questionOrder = data.questionOrder;
                        originalQuestionIndex = data.originalQuestionIndex || {};
                    }
                    return data;
                }
            }
        } catch (e) {
            console.log('Could not load progress');
        }
        return null;
    }

    // Original functions with improvements
    function startScan() {
        // Check for saved progress
        const savedProgress = loadProgress();
        if (savedProgress && savedProgress.currentQuestion > 0) {
            if (confirm('Je hebt een onvoltooide scan. Wil je verder gaan waar je gebleven was?')) {
                currentQuestion = savedProgress.currentQuestion;
                currentIntro = savedProgress.currentIntro;
                answers = savedProgress.answers;
                showQuestion();
                showScreen('questions');
                return;
            } else {
                localStorage.removeItem('talentScanProgress');
            }
        }
        
        // Initialize random order for new scan
        initializeQuestionOrder();
        currentIntro = 0;
        currentQuestion = 0;
        showIntro();
    }
    
    function showIntro() {
        showScreen('intro');
        
        // Get the actual question index from randomized order
        const actualIndex = questionOrder[currentIntro];
        const introText = introTexts[actualIndex];
        const introTextElement = document.getElementById('intro-text');
        
        // Safe DOM manipulation
        if (introTextElement) {
            const situationLine = introTextElement.querySelector('.situation-line');
            const contextLine = introTextElement.querySelector('.context-line');
            const questionLine = introTextElement.querySelector('.question-line');
            
            if (situationLine) situationLine.textContent = introText.situation;
            if (contextLine) contextLine.textContent = introText.context;
            if (questionLine) questionLine.textContent = introText.question;
        }
        
        // Update character image based on actual question (character follows the question)
        const characterImg = document.getElementById('character-img');
        if (characterImg) {
            const characterNames = ['emma', 'malik', 'sofie', 'zara', 'jasper', 'luna', 'noah', 'aisha', 'lars', 'mila', 'david', 'fatima'];
            const questionNumber = actualIndex + 1; // Character follows the actual question
            const characterName = characterNames[actualIndex] || 'emma';
            
            // Format: 01- emma.png, 02-malik.png etc.
            const imageNumber = questionNumber.toString().padStart(2, '0');
            let imageSrc;
            if (actualIndex === 0) {
                // First image has a space: "01- emma.png"
                imageSrc = `IMG/characters/${imageNumber}- ${characterName}.png`;
            } else {
                // Other images: "02-malik.png"
                imageSrc = `IMG/characters/${imageNumber}-${characterName}.png`;
            }
            
            characterImg.src = imageSrc;
            characterImg.alt = characterName.charAt(0).toUpperCase() + characterName.slice(1);
        }
        
        // Update counter and progress
        const counter = document.getElementById('intro-counter');
        if (counter) {
            counter.textContent = `Vraag ${currentIntro + 1} van 12`;
        }
        
        const progress = (currentIntro / 12) * 100;
        const progressBar = document.getElementById('intro-progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        // Button is always available
        const nextBtn = document.getElementById('intro-next-btn');
        if (nextBtn) {
            nextBtn.disabled = false;
        }
    }
    
    function nextFromIntro() {
        showScreen('questions');
        showQuestion();
        const nav = document.querySelector('.navigation');
        if (nav) {
            nav.style.display = 'flex';
        }
    }

    function showScreen(screenId) {
        // Fade out current screen
        const currentActive = document.querySelector('.screen.active');
        if (currentActive) {
            currentActive.classList.add('fade-out');
            
            setTimeout(() => {
                // Remove active from all screens
                document.querySelectorAll('.screen').forEach(screen => {
                    screen.classList.remove('active', 'fade-out');
                    if (screen.id === 'questions') {
                        const nav = screen.querySelector('.navigation');
                        if (nav) nav.style.display = 'none';
                    }
                });
                
                // Show target screen
                const targetScreen = document.getElementById(screenId);
                if (targetScreen) {
                    targetScreen.classList.add('active');
                    
                    if (screenId === 'questions') {
                        const nav = document.querySelector('.navigation');
                        if (nav) nav.style.display = 'flex';
                    }
                }
            }, 200); // Half the transition duration
        } else {
            // No current screen, show immediately
            const targetScreen = document.getElementById(screenId);
            if (targetScreen) {
                targetScreen.classList.add('active');
                
                if (screenId === 'questions') {
                    const nav = document.querySelector('.navigation');
                    if (nav) nav.style.display = 'flex';
                }
            }
        }
    }

    function showQuestion() {
        // Get the actual question index from randomized order
        const actualIndex = questionOrder[currentQuestion];
        const question = questions[actualIndex];
        const questionText = document.getElementById('question-text');
        if (questionText) {
            questionText.textContent = question.text;
        }
        
        const counter = document.getElementById('counter');
        if (counter) {
            counter.textContent = `Vraag ${currentQuestion + 1} van ${questions.length}`;
        }
        
        const progress = ((currentQuestion) / questions.length) * 100;
        const progressBar = document.getElementById('progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        const optionsContainer = document.getElementById('options');
        if (optionsContainer) {
            // Clear previous options
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                optionDiv.textContent = option.text;
                optionDiv.onclick = () => selectOption(index);
                
                // Restore selected state if exists (use actual index for answers)
                const actualIndex = questionOrder[currentQuestion];
                if (answers[actualIndex] === index) {
                    optionDiv.classList.add('selected');
                }
                
                optionsContainer.appendChild(optionDiv);
            });
        }
        
        updateNavigation();
        saveProgress();
    }

    function selectOption(index) {
        // Store answer at the actual question index
        const actualIndex = questionOrder[currentQuestion];
        answers[actualIndex] = index;
        
        document.querySelectorAll('.option').forEach(option => option.classList.remove('selected'));
        const selectedOption = document.querySelectorAll('.option')[index];
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
        
        updateNavigation();
        saveProgress();
        
        // Auto-advance to next question after short delay for UX
        setTimeout(() => {
            nextQuestion();
        }, 800);
    }

    function updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.disabled = currentQuestion === 0;
        }
        if (nextBtn) {
            const actualIndex = questionOrder[currentQuestion];
            nextBtn.disabled = answers[actualIndex] === undefined;
        }
    }

    function nextQuestion() {
        const actualIndex = questionOrder[currentQuestion];
        if (answers[actualIndex] !== undefined) {
            currentQuestion++;
            currentIntro++;
            if (currentQuestion < questions.length) {
                showIntro();
            } else {
                calculateResults();
            }
        }
    }

    function previousQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    }

    function calculateResults() {
        scores = {creatief: 0, digitaal: 0, onderzoekend: 0, sociaal: 0};
        
        answers.forEach((answerIndex, questionIndex) => {
            const question = questions[questionIndex];
            const selectedOption = question.options[answerIndex];
            
            if (selectedOption && selectedOption.scores) {
                Object.keys(selectedOption.scores).forEach(talent => {
                    scores[talent] += selectedOption.scores[talent];
                });
            }
        });
        
        // Save statistics for dashboard
        saveStatistics();
        
        // Clear saved progress after completion
        localStorage.removeItem('talentScanProgress');
        
        displayResults();
    }
    
    function saveStatistics() {
        // Determine primary talent
        let primaryTalent = '';
        let maxScore = 0;
        Object.keys(scores).forEach(talent => {
            if (scores[talent] > maxScore) {
                maxScore = scores[talent];
                primaryTalent = talent;
            }
        });
        
        // Save to Firebase (function from firebase-config.js)
        if (typeof saveCompletedScan === 'function') {
            saveCompletedScan(primaryTalent, answers, scores);
        } else {
            // Fallback to localStorage if Firebase not loaded
            try {
                const stats = JSON.parse(localStorage.getItem('talentScanStats') || '{}');
                stats.completedScans = (stats.completedScans || 0) + 1;
                stats.talentResults = stats.talentResults || {};
                stats.talentResults[primaryTalent] = (stats.talentResults[primaryTalent] || 0) + 1;
                stats.questionAnswers = stats.questionAnswers || {};
                
                answers.forEach((answerIndex, questionIndex) => {
                    if (!stats.questionAnswers[questionIndex]) {
                        stats.questionAnswers[questionIndex] = {};
                    }
                    stats.questionAnswers[questionIndex][answerIndex] = 
                        (stats.questionAnswers[questionIndex][answerIndex] || 0) + 1;
                });
                
                localStorage.setItem('talentScanStats', JSON.stringify(stats));
            } catch (e) {
                console.log('Could not save statistics');
            }
        }
    }

    function displayResults() {
        const maxScore = 36;
        const percentages = {};
        let primaryTalent = '';
        let maxPercentage = 0;
        
        Object.keys(scores).forEach(talent => {
            percentages[talent] = Math.round((scores[talent] / maxScore) * 100);
            if (percentages[talent] > maxPercentage) {
                maxPercentage = percentages[talent];
                primaryTalent = talent;
            }
        });
        
        // Redirect to results page with validated parameters
        const urlParams = new URLSearchParams();
        urlParams.set('primary', primaryTalent);
        Object.keys(percentages).forEach(talent => {
            urlParams.set(talent, Math.max(0, Math.min(100, percentages[talent])));
        });
        window.location.href = `results.html?${urlParams.toString()}`;
    }

    function restartScan() {
        currentQuestion = 0;
        answers = [];
        scores = {creatief: 0, digitaal: 0, onderzoekend: 0, sociaal: 0};
        localStorage.removeItem('talentScanProgress');
        
        // Show question elements again
        const progressBar = document.querySelector('.progress-bar');
        const questionCounter = document.querySelector('.question-counter');
        const question = document.querySelector('.question');
        
        if (progressBar) progressBar.style.display = 'block';
        if (questionCounter) questionCounter.style.display = 'block';
        if (question) question.style.display = 'block';
        
        // Remove results mode class
        const questionsScreen = document.getElementById('questions');
        if (questionsScreen) {
            questionsScreen.classList.remove('results-mode');
        }
        
        showScreen('welcome');
    }
    
    // Make functions available globally for onclick handlers
    window.startScan = startScan;
    window.showIntro = showIntro;
    window.nextFromIntro = nextFromIntro;
    window.showQuestion = showQuestion;
    window.selectOption = selectOption;
    window.nextQuestion = nextQuestion;
    window.previousQuestion = previousQuestion;
    window.restartScan = restartScan;
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startScan);
    } else {
        startScan();
    }
})();