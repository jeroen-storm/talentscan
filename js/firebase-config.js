// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4C-5dWbchpxwBSR3CsBHojGuC31GHets",
    authDomain: "talent-scan-4fed1.firebaseapp.com",
    projectId: "talent-scan-4fed1",
    storageBucket: "talent-scan-4fed1.firebasestorage.app",
    messagingSenderId: "555119008430",
    appId: "1:555119008430:web:28984b3f5df801d772eb3f",
    measurementId: "G-GRL790QKEH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore  
const db = firebase.firestore();

// Helper functions for statistics
async function saveCompletedScan(primaryTalent, answers, scores) {
    console.log('Saving scan to Firebase...', { primaryTalent, answers, scores });
    try {
        // Save scan result
        const scanResult = await db.collection('scans').add({
            primaryTalent: primaryTalent,
            scores: scores,
            answers: answers,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            date: new Date().toISOString()
        });
        console.log('Scan saved with ID:', scanResult.id);
        
        // Update aggregated statistics
        const statsRef = db.collection('statistics').doc('summary');
        const doc = await statsRef.get();
        
        if (doc.exists) {
            const stats = doc.data();
            
            // Update total scans
            await statsRef.update({
                totalScans: firebase.firestore.FieldValue.increment(1),
                [`talentCounts.${primaryTalent}`]: firebase.firestore.FieldValue.increment(1)
            });
            
            // Update question statistics
            const questionStats = stats.questionStats || {};
            answers.forEach((answerIndex, questionIndex) => {
                const key = `questionStats.q${questionIndex}.a${answerIndex}`;
                statsRef.update({
                    [key]: firebase.firestore.FieldValue.increment(1)
                });
            });
        } else {
            // Initialize statistics document
            const initialStats = {
                totalScans: 1,
                talentCounts: {
                    creatief: 0,
                    digitaal: 0,
                    onderzoekend: 0,
                    sociaal: 0
                },
                questionStats: {}
            };
            
            initialStats.talentCounts[primaryTalent] = 1;
            
            // Initialize question stats
            answers.forEach((answerIndex, questionIndex) => {
                if (!initialStats.questionStats[`q${questionIndex}`]) {
                    initialStats.questionStats[`q${questionIndex}`] = {
                        a0: 0, a1: 0, a2: 0, a3: 0
                    };
                }
                initialStats.questionStats[`q${questionIndex}`][`a${answerIndex}`] = 1;
            });
            
            await statsRef.set(initialStats);
        }
        
        console.log('Statistics updated successfully');
    } catch (error) {
        console.error('Error saving scan to Firebase:', error);
        // Fallback to localStorage if Firebase fails
        saveFallbackToLocalStorage(primaryTalent, answers, scores);
    }
}

function saveFallbackToLocalStorage(primaryTalent, answers, scores) {
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
        console.log('Could not save to localStorage either');
    }
}

async function loadDashboardStats() {
    try {
        const statsRef = db.collection('statistics').doc('summary');
        const doc = await statsRef.get();
        
        if (doc.exists) {
            return doc.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        // Fallback to localStorage
        return JSON.parse(localStorage.getItem('talentScanStats') || '{}');
    }
}

// Real-time listener for dashboard
function subscribeToDashboardStats(callback) {
    return db.collection('statistics').doc('summary')
        .onSnapshot((doc) => {
            if (doc.exists) {
                callback(doc.data());
            } else {
                callback(null);
            }
        }, (error) => {
            console.error('Error in real-time listener:', error);
            // Fallback to localStorage
            callback(JSON.parse(localStorage.getItem('talentScanStats') || '{}'));
        });
}